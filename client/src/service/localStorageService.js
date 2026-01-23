// localStorage-based book management for Vercel deployment
const STORAGE_KEY = 'bookInventory';

// Sample seed data
const seedData = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    publisher: 'Penguin Random House',
    contact_email: 'info@penguinrandomhouse.com',
    no_of_pages: 320,
    published_at: '2018-10-16',
    synopsis: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.'
  },
  {
    id: 2,
    title: 'The Pragmatic Programmer',
    author: 'David Thomas, Andrew Hunt',
    publisher: 'Addison-Wesley',
    contact_email: 'contact@awprofessional.com',
    no_of_pages: 352,
    published_at: '2019-09-13',
    synopsis: 'Your Journey To Mastery. A comprehensive guide to software craftsmanship and professional development.'
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    publisher: 'Prentice Hall',
    contact_email: 'info@prenticehall.com',
    no_of_pages: 464,
    published_at: '2008-08-01',
    synopsis: 'A Handbook of Agile Software Craftsmanship. Learn to write code that is clean, maintainable, and efficient.'
  }
];

// Initialize localStorage with seed data if empty
const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(existing);
};

// Get all books
export const getBooks = () => {
  try {
    const books = initializeStorage();
    return Promise.resolve({ data: books });
  } catch (error) {
    console.error('Error fetching books from localStorage:', error);
    return Promise.reject(error);
  }
};

// Get single book by ID
export const getBook = (id) => {
  try {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const book = books.find((b) => b.id === parseInt(id));
    if (!book) {
      return Promise.reject({ message: `Book ID ${id} not found` });
    }
    return Promise.resolve({ data: book });
  } catch (error) {
    console.error('Error fetching book from localStorage:', error);
    return Promise.reject(error);
  }
};

// Add new book
export const addBook = (payload) => {
  try {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newBook = {
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
      title: payload.title,
      author: payload.author,
      publisher: payload.publisher,
      contact_email: payload.contactEmail,
      no_of_pages: parseInt(payload.bookPages),
      published_at: payload.publishDate,
      synopsis: payload.synopsis
    };
    books.push(newBook);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return Promise.resolve({ data: { message: 'Book added successfully!', book: newBook } });
  } catch (error) {
    console.error('Error adding book to localStorage:', error);
    return Promise.reject(error);
  }
};

// Update existing book
export const editBook = (bookDetails) => {
  try {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const index = books.findIndex((b) => b.id === parseInt(bookDetails.id));
    if (index === -1) {
      return Promise.reject({ message: `Book ID ${bookDetails.id} not found` });
    }
    books[index] = {
      id: parseInt(bookDetails.id),
      title: bookDetails.title,
      author: bookDetails.author,
      publisher: bookDetails.publisher,
      contact_email: bookDetails.contact_email || bookDetails.contactEmail,
      no_of_pages: parseInt(bookDetails.no_of_pages),
      published_at: bookDetails.published_at,
      synopsis: bookDetails.synopsis
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    return Promise.resolve({ data: { message: 'Book updated successfully!' } });
  } catch (error) {
    console.error('Error updating book in localStorage:', error);
    return Promise.reject(error);
  }
};

// Delete book
export const deleteBook = (id) => {
  try {
    const books = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filteredBooks = books.filter((b) => b.id !== parseInt(id));
    if (books.length === filteredBooks.length) {
      return Promise.reject({ message: `Book ID ${id} not found` });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBooks));
    return Promise.resolve({ data: { message: 'Book deleted successfully!' } });
  } catch (error) {
    console.error('Error deleting book from localStorage:', error);
    return Promise.reject(error);
  }
};
