import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addBook } from '../../service/api';
import './addBook.css';
import 'animate.css';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publisher: '',
    contactEmail: '',
    bookPages: '',
    publishDate: '',
    synopsis: '',
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = (fieldValues = book) => {
    const temp = { ...errors };
    if ('title' in fieldValues) temp.title = fieldValues.title.trim() ? '' : 'Title is required.';
    if ('author' in fieldValues) temp.author = fieldValues.author.trim() ? '' : 'Author is required.';
    if ('publisher' in fieldValues) temp.publisher = fieldValues.publisher.trim() ? '' : 'Publisher is required.';
    if ('contactEmail' in fieldValues) temp.contactEmail = EMAIL_REGEX.test(fieldValues.contactEmail) ? '' : 'Enter a valid email.';
    if ('bookPages' in fieldValues) {
      const pages = Number(fieldValues.bookPages);
      temp.bookPages = Number.isInteger(pages) && pages > 0 ? '' : 'Pages must be a positive integer.';
    }
    if ('publishDate' in fieldValues) temp.publishDate = fieldValues.publishDate ? '' : 'Publish date is required.';
    if ('synopsis' in fieldValues) temp.synopsis = fieldValues.synopsis.trim().length >= 10 ? '' : 'Synopsis must be at least 10 characters.';
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...book, [name]: value };
    setBook(updated);
    validate({ [name]: value });
  };

  const addNewBook = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setFeedback('');
    try {
      const payload = {
        title: book.title.trim(),
        author: book.author.trim(),
        publisher: book.publisher.trim(),
        contactEmail: book.contactEmail.trim(),
        bookPages: Number(book.bookPages),
        publishDate: book.publishDate,
        synopsis: book.synopsis.trim(),
      };
      const response = await addBook(payload);
      setFeedback(response?.data?.message || 'Book added!');
      setBook({ title: '', author: '', publisher: '', contactEmail: '', bookPages: '', publishDate: '', synopsis: '' });
    } catch (error) {
      setFeedback('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className='form-shell animate__animated animate__backInDown'>
      <div className='form-header'>
        <div>
          <p className='eyebrow'>Create</p>
          <h1>Add a new book</h1>
          <p className='subtitle'>Capture the essentials so teammates can browse, edit, or reference the title later.</p>
        </div>
        <Link to='/books' className='ghost-btn'>Back to collection</Link>
      </div>

      {feedback && <div className='feedback-banner'>{feedback}</div>}

      <form className='add-book-form' onSubmit={addNewBook} noValidate>
        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' id='title' placeholder='Atomic Habits' value={book.title} onChange={onValueChange} />
            {errors.title && <span className='error'>{errors.title}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='author'>Author</label>
            <input type='text' name='author' id='author' placeholder='James Clear' value={book.author} onChange={onValueChange} />
            {errors.author && <span className='error'>{errors.author}</span>}
          </div>
        </div>

        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='publisher'>Publisher</label>
            <input type='text' name='publisher' id='publisher' placeholder='Penguin Random House' value={book.publisher} onChange={onValueChange} />
            {errors.publisher && <span className='error'>{errors.publisher}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='contactEmail'>Contact Email</label>
            <input type='email' name='contactEmail' id='contactEmail' placeholder='editor@publisher.com' value={book.contactEmail} onChange={onValueChange} />
            {errors.contactEmail && <span className='error'>{errors.contactEmail}</span>}
          </div>
        </div>

        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='bookPages'># of Pages</label>
            <input type='number' min='1' name='bookPages' id='bookPages' placeholder='320' value={book.bookPages} onChange={onValueChange} />
            {errors.bookPages && <span className='error'>{errors.bookPages}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='publishDate'>Date Published</label>
            <input type='date' name='publishDate' id='publishDate' value={book.publishDate} onChange={onValueChange} />
            {errors.publishDate && <span className='error'>{errors.publishDate}</span>}
          </div>
        </div>

        <div className='input-container'>
          <label htmlFor='synopsis'>Synopsis</label>
          <textarea name='synopsis' id='synopsis' rows='4' placeholder='What is the core idea? Who is it for?'
            value={book.synopsis} onChange={onValueChange}></textarea>
          {errors.synopsis && <span className='error'>{errors.synopsis}</span>}
        </div>

        <div className='actions-row'>
          <button type='submit' className='primary-btn' disabled={submitting}>
            {submitting ? 'Saving…' : 'Add Book'}
          </button>
          <Link to='/books' className='ghost-btn'>Cancel</Link>
        </div>
      </form>
    </section>
  );
};

export default AddBook;
