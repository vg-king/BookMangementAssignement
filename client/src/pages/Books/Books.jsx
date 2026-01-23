import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, deleteBook } from '../../service/api';
import './books.css';
import 'animate.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response?.data || []);
      setFeedback('');
    } catch (error) {
      setFeedback('Unable to fetch books right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBookFromCollection = async (id, title) => {
    const confirmed = window.confirm(
      `⚠️ Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      const response = await deleteBook(id);
      setFeedback('✅ ' + (response?.data?.message || 'Book deleted successfully.'));
      getAllBooks();
    } catch (error) {
      setFeedback('❌ Could not delete this book. Please try again.');
    }
  };

  return (
    <section className='books-page animate__animated animate__backInDown'>
      <header className='books-page__header'>
        <div>
          <p className='eyebrow'>Inventory</p>
          <h1>Books Collection</h1>
          <p className='subtitle'>Browse, inspect, edit, or remove any title in your inventory.</p>
        </div>
        <Link className='primary-btn' to='/addBook'>
          + Add Book
        </Link>
      </header>

      {feedback && <div className='feedback-banner'>{feedback}</div>}

      <div className='table-wrapper'>
        <table className='books-table'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Pages</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan='6' className='table-empty'>Loading collection…</td>
              </tr>
            ) : books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className='cell-title'>
                      <span className='cell-heading'>{book.title}</span>
                      <span className='cell-sub'>ID: {book.id}</span>
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>{book.publisher || '—'}</td>
                  <td>{book.no_of_pages}</td>
                  <td>{book.published_at}</td>
                  <td className='table-actions'>
                    <Link to={`/books/${book.id}`} className='ghost-btn'>
                      View
                    </Link>
                    <Link to={`/books/editBook/${book.id}`} className='ghost-btn'>
                      Edit
                    </Link>
                    <button className='danger-btn' onClick={() => deleteBookFromCollection(book.id, book.title)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='table-empty'>No books yet. Add your first title to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Books;
