import { fetchBooksData } from './fetchBooksData';
import { bookService } from './services/booksService';
import { prepareBooksList } from '@/utils/prepareBooksList';
import { messages } from '@/sources/messages';
import { vi } from 'vitest';

vi.mock('./services/booksService', () => ({
  bookService: {
    getBooksList: vi.fn(),
  },
}));

vi.mock('@/utils/prepareBooksList', () => ({
  prepareBooksList: vi.fn(),
}));

describe('FetchBooksData', () => {
  it('Calls bookService and prepares books list', async () => {
    const mockBooks = [{ id: '1', title: 'Book' }];
    const prepared = [{ id: '1', title: 'Book (prepared)' }];

    (bookService.getBooksList as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockBooks
    );
    (prepareBooksList as ReturnType<typeof vi.fn>).mockReturnValue(prepared);

    const result = await fetchBooksData('react');

    expect(bookService.getBooksList).toHaveBeenCalledWith('react');
    expect(prepareBooksList).toHaveBeenCalledWith(mockBooks);
    expect(result).toEqual(prepared);
  });

  describe('Throws an error', () => {
    it('Throws a formatted error when bookService fails', async () => {
      (bookService.getBooksList as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('API error')
      );

      await expect(fetchBooksData('react')).rejects.toThrow('API error');
    });

    it('Throws default error when thrown error is not instanceof Error', async () => {
      (bookService.getBooksList as ReturnType<typeof vi.fn>).mockRejectedValue(
        'Some string error'
      );

      await expect(fetchBooksData('react')).rejects.toThrow(
        messages.errorMessage
      );
    });
  });
});
