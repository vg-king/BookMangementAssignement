import axios from 'axios';

const URL = process.env.REACT_APP_API_URL || 'http://localhost:8083';

export const getBooks = async () => {
  try {
    return await axios.get(`${URL}/books`);
  } catch (error) {
    console.log('Error while calling get books API', error);
  }
};

export const getBook = async (id) => {
  try {
    return await axios.get(`${URL}/books/editBook/${id}`);
  } catch (error) {
    console.log('Error while calling get book API', error);
  }
};

export const editBook = async (bookDetails) => {
  try {
    return await axios.put(`${URL}/books/editBook/${bookDetails.id}`, {
      ...bookDetails,
      contact_email: bookDetails.contact_email || bookDetails.contactEmail,
    });
  } catch (error) {
    console.log('Error while calling edit book API', error);
  }
};

export const addBook = async (payload) => {
  try {
    return await axios.post(`${URL}/books/addBook`, payload);
  } catch (error) {
    console.log('Error while calling add book API', error);
  }
};

export const deleteBook = async (id) => {
  try {
    return await axios.delete(`${URL}/books/${id}`);
  } catch (error) {
    console.log('Error while calling delete book API', error);
  }
};
