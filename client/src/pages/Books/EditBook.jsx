import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook, editBook } from '../../service/api';
import './addBook.css';
import 'animate.css';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const EditBook = () => {
  const [book, setBook] = useState({
    id: 0,
    title: '',
    author: '',
    publisher: '',
    contact_email: '',
    synopsis: '',
    no_of_pages: '',
    published_at: '',
  });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [saving, setSaving] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadBookDetails(id);
  }, [id]);

  const loadBookDetails = async (bookId) => {
    const response = await getBook(bookId);
    const data = response?.data || {};
    setBook({
      id: data.id,
      title: data.title || '',
      author: data.author || '',
      publisher: data.publisher || '',
      contact_email: data.contact_email || '',
      synopsis: data.synopsis || '',
      no_of_pages: data.no_of_pages || '',
      published_at: data.published_at || '',
    });
  };

  const validate = (fieldValues = book) => {
    const temp = { ...errors };
    if ('title' in fieldValues) temp.title = fieldValues.title?.trim() ? '' : 'Title is required.';
    if ('author' in fieldValues) temp.author = fieldValues.author?.trim() ? '' : 'Author is required.';
    if ('publisher' in fieldValues) temp.publisher = fieldValues.publisher?.trim() ? '' : 'Publisher is required.';
    if ('contact_email' in fieldValues) temp.contact_email = EMAIL_REGEX.test(fieldValues.contact_email) ? '' : 'Enter a valid email.';
    if ('no_of_pages' in fieldValues) {
      const pages = Number(fieldValues.no_of_pages);
      temp.no_of_pages = Number.isInteger(pages) && pages > 0 ? '' : 'Pages must be a positive integer.';
    }
    if ('published_at' in fieldValues) temp.published_at = fieldValues.published_at ? '' : 'Publish date is required.';
    if ('synopsis' in fieldValues) temp.synopsis = fieldValues.synopsis?.trim().length >= 10 ? '' : 'Synopsis must be at least 10 characters.';
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === '');
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...book, [name]: value };
    setBook(updated);
    validate({ [name]: value });
  };

  const updateNewBook = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setFeedback('');
    try {
      const response = await editBook({
        ...book,
        contact_email: book.contact_email,
        no_of_pages: Number(book.no_of_pages),
      });
      setFeedback(response?.data?.message || 'Book updated!');
    } catch (error) {
      setFeedback('Unable to update this book right now.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className='form-shell animate__animated animate__backInDown'>
      <div className='form-header'>
        <div>
          <p className='eyebrow'>Update</p>
          <h1>Edit book details</h1>
          <p className='subtitle'>Keep information accurate so anyone can trust the inventory.</p>
        </div>
        <Link to='/books' className='ghost-btn'>Back to collection</Link>
      </div>

      {feedback && <div className='feedback-banner'>{feedback}</div>}

      <form className='add-book-form' onSubmit={updateNewBook}>
        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='title'>Title</label>
            <input type='text' name='title' id='title' value={book.title} onChange={onValueChange} />
            {errors.title && <span className='error'>{errors.title}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='author'>Author</label>
            <input type='text' name='author' id='author' value={book.author} onChange={onValueChange} />
            {errors.author && <span className='error'>{errors.author}</span>}
          </div>
        </div>

        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='publisher'>Publisher</label>
            <input type='text' name='publisher' id='publisher' value={book.publisher} onChange={onValueChange} />
            {errors.publisher && <span className='error'>{errors.publisher}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='contact_email'>Contact Email</label>
            <input type='email' name='contact_email' id='contact_email' value={book.contact_email} onChange={onValueChange} />
            {errors.contact_email && <span className='error'>{errors.contact_email}</span>}
          </div>
        </div>

        <div className='grid'>
          <div className='input-container'>
            <label htmlFor='no_of_pages'># of Pages</label>
            <input type='number' min='1' name='no_of_pages' id='no_of_pages' value={book.no_of_pages} onChange={onValueChange} />
            {errors.no_of_pages && <span className='error'>{errors.no_of_pages}</span>}
          </div>
          <div className='input-container'>
            <label htmlFor='published_at'>Date Published</label>
            <input type='date' name='published_at' id='published_at' value={book.published_at} onChange={onValueChange} />
            {errors.published_at && <span className='error'>{errors.published_at}</span>}
          </div>
        </div>

        <div className='input-container'>
          <label htmlFor='synopsis'>Synopsis</label>
          <textarea name='synopsis' id='synopsis' rows='4' value={book.synopsis} onChange={onValueChange}></textarea>
          {errors.synopsis && <span className='error'>{errors.synopsis}</span>}
        </div>

        <div className='actions-row'>
          <button type='submit' className='primary-btn' disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <Link to='/books' className='ghost-btn'>Cancel</Link>
        </div>
      </form>
    </section>
  );
};

export default EditBook;
