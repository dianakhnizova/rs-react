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
  });

  describe('getBookById', () => {
    const baseBookResponse = {
      key: '/works/OL123W',
      title: 'Test Book',
      covers: [12345],
      description: {
        value: 'A complex description',
      },
      authors: [{ author: { key: '/authors/OL456A' } }],
      first_publish_date: '2000',
    };

    it('returns full book data with stringified author names', async () => {
      mockedAxios.get
        .mockResolvedValueOnce({ data: baseBookResponse })
        .mockResolvedValueOnce({ data: { name: 'John Doe' } });

      const result = await bookService.getBookById('OL123W');

      expect(result).toEqual({
        id: 'OL123W',
        title: 'Test Book',
        image: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
        description: 'A complex description',
        authors: 'John Doe',
        year: '2000',
        printType: 'book',
      });
    });
  });
});
