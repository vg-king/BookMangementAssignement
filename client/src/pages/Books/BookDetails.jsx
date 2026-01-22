import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook } from '../../service/api';
import './bookDetails.css';
import 'animate.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await getBook(id);
        const data = response?.data;
        if (data && data.id) {
          setBook(data);
          setError('');
        } else {
          setBook(null);
          setError('Record not found.');
        }
      } catch (err) {
        setError('Unable to load this book.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <section className='details-shell animate__animated animate__fadeIn'>
        <p className='eyebrow'>Loading</p>
        <h1>Fetching book details…</h1>
      </section>
    );
  }

  if (!book) {
    return (
      <section className='details-shell animate__animated animate__fadeIn'>
        <p className='eyebrow'>Not found</p>
        <h1>Book unavailable</h1>
        <p className='subtitle'>We could not locate that record. It may have been deleted.</p>
        <Link to='/books' className='primary-btn'>Back to collection</Link>
      </section>
    );
  }

  return (
    <section className='details-shell animate__animated animate__fadeIn'>
      <div className='details-header'>
        <div>
          <p className='eyebrow'>Book ID {book.id}</p>
          <h1>{book.title}</h1>
          <p className='subtitle'>By {book.author}</p>
        </div>
        <div className='header-actions'>
          <Link to={`/books/editBook/${book.id}`} className='ghost-btn'>Edit</Link>
          <Link to='/books' className='primary-btn'>Back to collection</Link>
        </div>
      </div>

      {error && <div className='feedback-banner'>{error}</div>}

      <div className='details-grid'>
        <article className='detail-card'>
          <h3>Publishing</h3>
          <dl>
            <div className='row'>
              <dt>Publisher</dt>
              <dd>{book.publisher || '—'}</dd>
            </div>
            <div className='row'>
              <dt>Contact Email</dt>
              <dd>
                {book.contact_email ? (
                  <a href={`mailto:${book.contact_email}`}>{book.contact_email}</a>
                ) : (
                  '—'
                )}
              </dd>
            </div>
            <div className='row'>
              <dt>Published</dt>
              <dd>{book.published_at || '—'}</dd>
            </div>
            <div className='row'>
              <dt>Pages</dt>
              <dd>{book.no_of_pages}</dd>
            </div>
          </dl>
        </article>

        <article className='detail-card'>
          <h3>Synopsis</h3>
          <p className='synopsis-text'>{book.synopsis || 'No synopsis provided yet.'}</p>
        </article>
      </div>
    </section>
  );
};

export default BookDetails;
