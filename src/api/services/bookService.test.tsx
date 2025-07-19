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
