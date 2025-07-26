import { bookService } from './booksService';
import { booksApi } from '../axios';
import { vi } from 'vitest';

vi.mock('../axios', () => ({
  booksApi: {
    get: vi.fn(),
  },
}));

describe('BooksService', () => {
  describe('getBooksList', () => {
    const defaultPage = 1;
    const defaultPageItems = 10;

    it('Returns an empty books and totalItems = 0 when response.items is not an array', async () => {
      (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: { items: undefined, totalItems: 0 },
      });

      const result = await bookService.getBooksList(
        'test',
        defaultPage,
        defaultPageItems
      );

      expect(result).toEqual({ books: [], totalItems: 0 });
    });

    it('Handles missing volumeInfo and imageLinks gracefully', async () => {
      (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: {
          items: [
            {
              id: '1',
              volumeInfo: undefined,
            },
            {
              id: '2',
              volumeInfo: {
                title: 'Book with image',
                description: 'Description',
                imageLinks: {
                  thumbnail: 'http://image.jpg',
                },
              },
            },
            {
              id: '3',
              volumeInfo: {
                title: 'Book without image',
                description: 'Description',
              },
            },
          ],
          totalItems: 1,
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
            id: '2',
            title: 'Book with image',
            description: 'Description',
            image: 'https://image.jpg',
          },
          {
            id: '3',
            title: 'Book without image',
            description: 'Description',
            image: '',
          },
        ],
        totalItems: 1,
      });
    });
  });
});
