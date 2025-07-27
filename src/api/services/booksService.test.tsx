import { bookService } from './booksService';
import { vi } from 'vitest';
import axios from 'axios';

vi.mock('axios');
const mockedAxios = axios as unknown as { get: ReturnType<typeof vi.fn> };

describe('BooksService', () => {
  describe('getBooksList', () => {
    const defaultPage = 1;
    const defaultPageItems = 10;

    it('Returns an empty books and totalItems = 0 when response.items is not an array', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          docs: undefined,
          numFound: 0,
        },
      });

      const result = await bookService.getBooksList(
        'test',
        defaultPage,
        defaultPageItems
      );

      expect(result).toEqual({ books: [], totalItems: 0 });
    });

    it('Handles missing volumeInfo and imageLinks gracefully', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          docs: [
            {
              key: '/works/OL123W',
              title: 'Book with image',
              cover_i: 12345,
            },
            {
              key: '/works/OL456W',
              title: 'Book without image',
            },
          ],
          numFound: 2,
        },
      });

      const result = await bookService.getBooksList(
        'book',
        defaultPage,
        defaultPageItems
      );

      expect(result).toEqual({
        books: [
          {
            id: 'OL123W',
            title: 'Book with image',
            image: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
          },
          {
            id: 'OL456W',
            title: 'Book without image',
            image: '',
          },
        ],
        totalItems: 2,
      });
    });

    it('Uses "fiction" when query is empty or whitespace', async () => {
      mockedAxios.get.mockResolvedValue({
        data: { docs: [], numFound: 0 },
      });

      await bookService.getBooksList('   ', 1, 10);

      expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params: expect.objectContaining({ title: 'fiction' }),
      });
    });
  });

  describe('getBookById', () => {
    const baseBookResponse = {
      key: '/works/344ffsf',
      title: 'Test Book',
      covers: [12345],
      description: {
        value: 'Test description',
      },
      authors: [{ author: { key: '/authors/344ffsf' } }],
      first_publish_date: '2000',
    };

    it('Returns full book data with stringified author names', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: baseBookResponse })
        .mockResolvedValueOnce({ data: { name: 'John Doe' } });

      const result = await bookService.getBookById('O344ffsf');

      expect(result).toEqual({
        id: '344ffsf',
        title: 'Test Book',
        image: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
        description: 'Test description',
        authors: 'John Doe',
        year: '2000',
        printType: 'book',
      });
    });

    it('Handles failed author request gracefully', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: baseBookResponse })
        .mockRejectedValueOnce(new Error('Author not found'));
      const result = await bookService.getBookById('344ffsf');

      expect(result.authors).toBe('');
    });

    it('Handles description as string', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            ...baseBookResponse,
            description: 'Test description',
          },
        })
        .mockResolvedValueOnce({ data: { name: 'Diana Khnizova' } });

      const result = await bookService.getBookById('eerere45');

      expect(result.description).toBe('Test description');
    });

    it('Returns full book data with stringified author names', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: baseBookResponse })
        .mockResolvedValueOnce({ data: { name: 'John Doe' } });

      const result = await bookService.getBookById('344ffsf');

      expect(result).toEqual({
        id: '344ffsf',
        title: 'Test Book',
        image: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
        description: 'Test description',
        authors: 'John Doe',
        year: '2000',
        printType: 'book',
      });
    });

    it('Handles missing description gracefully', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({
          data: {
            ...baseBookResponse,
            description: undefined,
          },
        })
        .mockResolvedValueOnce({ data: { name: 'Authorless' } });

      const result = await bookService.getBookById('noDescId');
      expect(result.description).toBe('');
    });
  });
});
