import axios from 'axios';
import * as localStorageService from './localStorageService';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8083';

// Use localStorage for production (Vercel), API for local development
const USE_LOCALSTORAGE = !URL || URL === '' || process.env.NODE_ENV === 'production';

export const getBooks = async () => {
  if (USE_LOCALSTORAGE) {
    return localStorageService.getBooks();
  }
  try {
    return await axios.get(`${URL}/books`);
  } catch (error) {
    console.log('Error while calling get books API', error);
    throw error;
  }
};

export const getBook = async (id) => {
  if (USE_LOCALSTORAGE) {
    return localStorageService.getBook(id);
  }
  try {
    return await axios.get(`${URL}/books/editBook/${id}`);
  } catch (error) {
    console.log('Error while calling get book API', error);
    throw error;
  }
};

export const editBook = async (bookDetails) => {
  if (USE_LOCALSTORAGE) {
    return localStorageService.editBook(bookDetails);
  }
  try {
    return await axios.put(`${URL}/books/editBook/${bookDetails.id}`, {
      ...bookDetails,
      contact_email: bookDetails.contact_email || bookDetails.contactEmail,
    });
  } catch (error) {
    console.log('Error while calling edit book API', error);
    throw error;
  }
};

export const addBook = async (payload) => {
  if (USE_LOCALSTORAGE) {
    return localStorageService.addBook(payload);
  }
  try {
    return await axios.post(`${URL}/books/addBook`, payload);
  } catch (error) {
    console.log('Error while calling add book API', error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  if (USE_LOCALSTORAGE) {
    return localStorageService.deleteBook(id);
  }
  try {
    return await axios.delete(`${URL}/books/${id}`);
  } catch (error) {
    console.log('Error while calling delete book API', error);
    throw error;
  }
};
