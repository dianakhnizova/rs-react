import { bookService } from './booksService';
import { booksApi } from '../axios';
import { vi } from 'vitest';

vi.mock('../axios', () => ({
  booksApi: {
    get: vi.fn(),
  },
}));

describe('bookService.getBooksList', () => {
  it('returns list of books for valid query', async () => {
    const mockResponse = {
      data: {
        items: [
          {
            id: '1',
            volumeInfo: {
              title: 'Test Book',
              description: 'Description',
              imageLinks: {
                thumbnail: 'http://image.jpg',
              },
            },
          },
        ],
      },
    };

    (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue(mockResponse);

    const result = await bookService.getBooksList('test');

    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Book',
        description: 'Description',
        image: 'https://image.jpg',
      },
    ]);
  });
});

it('returns an empty array when response.items is not an array', async () => {
  (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
    data: { items: undefined },
  });

  const result = await bookService.getBooksList('test');

  expect(result).toEqual([]);
});

it('filters books by title containing the search term', async () => {
  (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
    data: {
      items: [
        {
          id: '1',
          volumeInfo: {
            title: 'React for Beginners',
            description: 'desc',
            imageLinks: {},
          },
        },
        {
          id: '2',
          volumeInfo: {
            title: 'Cooking Recipes',
            description: 'desc',
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

it('throws error when API call fails', async () => {
  (booksApi.get as ReturnType<typeof vi.fn>).mockRejectedValue(
    new Error('Internal Server Error')
  );

  await expect(bookService.getBooksList('test')).rejects.toThrow(
    'Failed to load books.'
  );
});

it('returns books with empty image when imageLinks is missing', async () => {
  (booksApi.get as ReturnType<typeof vi.fn>).mockResolvedValue({
    data: {
      items: [
        {
          id: '1',
          volumeInfo: {
            title: 'Book without image',
            description: 'desc',
          },
        },
      ],
    },
  });

  const result = await bookService.getBooksList('book');

  expect(result[0].image).toBe('');
});

it('skips items without volumeInfo', async () => {
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
            title: 'Valid Book',
            description: 'desc',
            imageLinks: {},
          },
        },
      ],
    },
  });

  const result = await bookService.getBooksList('valid');

  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('2');
});
