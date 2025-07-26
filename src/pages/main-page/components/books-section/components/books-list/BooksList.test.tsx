import { render, screen, waitFor } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { fetchBooksData } from '@/api/fetchBooksData';
import type { BookData } from '@/sources/types';
import { messages as bookListMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@/api/fetchBooksData');

const mockedFetchBooksData = vi.mocked(fetchBooksData);

const mockedBooks: BookData[] = [
  {
    id: '1',
    title: 'Book One',
    description: 'Description One',
    image: 'image1.jpg',
  },
  {
    id: '2',
    title: 'Book Two',
    description: 'Description Two',
    image: 'image2.jpg',
  },
];

const renderBooksList = (
  overrides?: Partial<React.ComponentProps<typeof BooksList>>
) => {
  const defaultProps = {
    searchTerm: '',
    setLoading: vi.fn(),
    setError: vi.fn(),
    onClose: vi.fn(),
    isLoading: false,
  };

  return render(
    <MemoryRouter>
      <BooksList {...defaultProps} {...overrides} />
    </MemoryRouter>
  );
};

describe('BookList', () => {
  describe('BooksList - Rendering', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Renders correct number of items when data is provided', async () => {
      mockedFetchBooksData.mockResolvedValue({
        booksList: mockedBooks,
        totalItems: 20,
      });

      renderBooksList({ searchTerm: 'react' });

      await waitFor(() => {
        expect(screen.getAllByRole('listitem')).toHaveLength(
          mockedBooks.length
        );
      });
    });

    it('Renders "Not books for you" when fetch returns empty array', async () => {
      mockedFetchBooksData.mockResolvedValue({
        booksList: [],
        totalItems: 0,
      });

      renderBooksList({ searchTerm: 'react' });

      await waitFor(() => {
        expect(
          screen.getByText(bookListMessages.emptyList)
        ).toBeInTheDocument();
      });
    });

    it('Correctly displays item names', async () => {
      mockedFetchBooksData.mockResolvedValue({
        booksList: mockedBooks,
        totalItems: 20,
      });

      renderBooksList({ searchTerm: 'react' });

      for (const book of mockedBooks) {
        await waitFor(() => {
          if (book.title) {
            expect(screen.getByText(book.title)).toBeInTheDocument();
          }
        });
      }
    });

    it('Calls fetchBooksData with correct args', async () => {
      mockedFetchBooksData.mockResolvedValue({
        booksList: [],
        totalItems: 0,
      });

      renderBooksList({ searchTerm: 'react' });

      await waitFor(() => {
        expect(mockedFetchBooksData).toHaveBeenCalledWith('react', 1, 5);
      });
    });
  });

  describe('Throws an error', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('Throws a formatted error when fetchBooksData fails with Error', async () => {
      mockedFetchBooksData.mockRejectedValue(new Error('API error'));

      const setError = vi.fn();

      renderBooksList({
        searchTerm: 'react',
        setError,
      });

      await waitFor(() => {
        expect(setError).toHaveBeenCalledWith('API error');
      });
    });

    it('Throws default error when fetchBooksData fails with non-Error', async () => {
      mockedFetchBooksData.mockRejectedValue('Some string error');

      const setError = vi.fn();

      renderBooksList({
        searchTerm: 'react',
        setError,
      });

      await waitFor(() => {
        expect(setError).toHaveBeenCalledWith(sourceMessages.errorMessage);
      });
    });
  });
});
