import { fetchBooksData } from './fetchBooksData';
import { bookService } from './services/booksService';
import { prepareBooksList } from '@/utils/prepareBooksList';
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
    const mockTotalItems = 42;

    (bookService.getBooksList as ReturnType<typeof vi.fn>).mockResolvedValue({
      books: mockBooks,
      totalItems: mockTotalItems,
    });

    (prepareBooksList as ReturnType<typeof vi.fn>).mockReturnValue(prepared);

    const searchTerm = 'react';
    const page = 2;
    const pageItemsResults = 10;

    const result = await fetchBooksData(searchTerm, page, pageItemsResults);

    expect(bookService.getBooksList).toHaveBeenCalledWith(
      searchTerm,
      page,
      pageItemsResults
    );
    expect(prepareBooksList).toHaveBeenCalledWith(mockBooks);
    expect(result).toEqual({
      booksList: prepared,
      totalItems: mockTotalItems,
    });
  });
});
