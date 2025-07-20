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
    it('Returns an empty array when response.items is not an array', async () => {
      (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: { items: undefined },
      });

      const result = await bookService.getBooksList('test');

      expect(result).toEqual([]);
    });

    it('Filters books by title containing the search term', async () => {
      (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
        data: {
          items: [
            {
              id: '1',
              volumeInfo: {
                title: 'React for Beginners',
                description: 'Description',
                imageLinks: {},
              },
            },
            {
              id: '2',
              volumeInfo: {
                title: 'Cooking Recipes',
                description: 'Description',
                imageLinks: {},
              },
            },
          ],
        },
      });

      const result = await bookService.getBooksList('react');

      expect(result.length).toBe(1);
      expect(result[0].title).toBe('React for Beginners');
    });

    it('Throws error when API call fails', async () => {
      (booksApi.get as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('Internal Server Error')
      );

      await expect(bookService.getBooksList('test')).rejects.toThrow(
        'Failed to load books.'
      );
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
        },
      });

      const result = await bookService.getBooksList('book');

      expect(result).toEqual([
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
      ]);
    });
  });
});
