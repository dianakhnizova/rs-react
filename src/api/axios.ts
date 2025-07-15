import { BOOKS_API_URL } from '@/sources/constants';
import axios from 'axios';

export const booksApi = axios.create({
  baseURL: BOOKS_API_URL,
  headers: {
    'Accept-Language': 'en',
  },
});
