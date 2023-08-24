// lib/api.js
import axios from 'axios';

const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
};

export const fetchBooks = async (searchTerm: string): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}?q=${searchTerm}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};
