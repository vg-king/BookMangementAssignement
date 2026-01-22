const data = {
  books: require('../model/books.json'),
  setBooks: function (data) {
    this.books = data;
  },
};

const fsPromises = require('fs').promises;
const path = require('path');

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const getAllBooks = (req, res) => {
  res.json(data.books);
};

const getBook = (req, res) => {
  const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
  if (!book) {
    return res.json({ message: `Book ID ${req.params.id} not found!` });
  }

  res.json(book);
};

const createNewBook = async (req, res) => {
  const contactEmail = req.body.contactEmail || req.body.contact_email;
  const newBook = {
    id: data.books?.length ? data.books[data.books.length - 1].id + 1 : 1,
    title: req.body.title?.trim(),
    author: req.body.author?.trim(),
    publisher: req.body.publisher?.trim(),
    contact_email: contactEmail?.trim(),
    synopsis: req.body.synopsis?.trim(),
    no_of_pages: parseInt(req.body.bookPages, 10),
    published_at: req.body.publishDate,
  };

  if (!newBook.title || !newBook.author || !newBook.publisher || !newBook.contact_email || !newBook.synopsis) {
    return res.status(400).json({ message: 'Please enter all required details.' });
  }

  if (!EMAIL_REGEX.test(newBook.contact_email)) {
    return res.status(400).json({ message: 'Please provide a valid contact email.' });
  }

  if (!Number.isInteger(newBook.no_of_pages) || newBook.no_of_pages <= 0) {
    return res.status(400).json({ message: 'Pages must be a positive integer.' });
  }

  if (!newBook.published_at) {
    return res.status(400).json({ message: 'Publish date is required.' });
  }

  data.setBooks([...data.books, newBook]);
  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
  res.status(201).json({ message: 'Book added!' });
};

const updateBook = async (req, res) => {
  const updatedBook = data.books.find((bk) => bk.id === parseInt(req.body.id));

  if (!updatedBook) {
    return res.status(404).json({ message: `Book ID ${req.body.id} not found` });
  }

  const contactEmail = req.body.contact_email || req.body.contactEmail;
  const { title, author, publisher, synopsis, no_of_pages, published_at } = req.body;

  if (!title || !author || !publisher || !contactEmail || !synopsis || !no_of_pages || !published_at) {
    return res.status(400).json({ message: 'Please do not leave empty fields.' });
  }

  if (!EMAIL_REGEX.test(contactEmail)) {
    return res.status(400).json({ message: 'Please provide a valid contact email.' });
  }

  if (!Number.isInteger(parseInt(no_of_pages, 10)) || parseInt(no_of_pages, 10) <= 0) {
    return res.status(400).json({ message: 'Pages must be a positive integer.' });
  }

  updatedBook.title = title.trim();
  updatedBook.author = author.trim();
  updatedBook.publisher = publisher.trim();
  updatedBook.contact_email = contactEmail.trim();
  updatedBook.synopsis = synopsis.trim();
  updatedBook.no_of_pages = parseInt(no_of_pages, 10);
  updatedBook.published_at = published_at;

  const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.body.id));
  const unsortedArray = [...filteredArray, updatedBook];

  data.setBooks(unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));
  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
  res.json({ message: 'Book updated!' });
};

const deleteBook = async (req, res) => {
  const book = data.books.find((bk) => bk.id === parseInt(req.params.id));
  if (!book) {
    return res.json({ message: `Book ID ${req.params.id} not found` });
  }
  const filteredArray = data.books.filter((bk) => bk.id !== parseInt(req.params.id));
  data.setBooks([...filteredArray]);
  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'books.json'), JSON.stringify(data.books));
  res.json({ message: 'Book deleted!' });
};

module.exports = { getAllBooks, getBook, createNewBook, updateBook, deleteBook };
