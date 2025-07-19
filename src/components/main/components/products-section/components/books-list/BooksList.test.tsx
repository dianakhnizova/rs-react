import { render, screen, waitFor } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { fetchBooksData } from '@/api/fetchBooksData';
import type { BookData } from '@/sources/types';
import { messages } from '../books-list/messages';

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

  return render(<BooksList {...defaultProps} {...overrides} />);
};

describe('BooksList - Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Renders correct number of items when data is provided', async () => {
    mockedFetchBooksData.mockResolvedValue(mockedBooks);

    renderBooksList({ searchTerm: 'react' });

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(mockedBooks.length);
    });
  });

  it('Renders "Not books for you" when fetch returns empty array', async () => {
    mockedFetchBooksData.mockResolvedValue([]);

    renderBooksList({ searchTerm: 'react' });

    await waitFor(() => {
      expect(screen.getByText(messages.emptyList)).toBeInTheDocument();
    });
  });

  it('Correctly displays item names and descriptions', async () => {
    mockedFetchBooksData.mockResolvedValue(mockedBooks);

    renderBooksList({ searchTerm: 'react' });

    for (const book of mockedBooks) {
      await waitFor(() => {
        expect(screen.getByText(book.title)).toBeInTheDocument();
        expect(screen.getByText(book.description)).toBeInTheDocument();
      });
    }
  });

  it('Calls fetchBooksData with correct searchTerm', async () => {
    mockedFetchBooksData.mockResolvedValue([]);

    renderBooksList({ searchTerm: 'react' });

    await waitFor(() => {
      expect(mockedFetchBooksData).toHaveBeenCalledWith('react');
    });
  });

  describe('BooksList - Handles API error', () => {
    it('Calls setError with message when API throws', async () => {
      const mockErrorMessage = 'Something went wrong';
      const mockSetError = vi.fn();
      const mockSetLoading = vi.fn();

      mockedFetchBooksData.mockRejectedValue(new Error(mockErrorMessage));

      renderBooksList({
        searchTerm: 'react',
        setError: mockSetError,
        setLoading: mockSetLoading,
      });

      await waitFor(() => {
        expect(mockSetError).toHaveBeenCalledWith(mockErrorMessage);
        expect(mockSetLoading).toHaveBeenCalledWith(true);
        expect(mockSetLoading).toHaveBeenLastCalledWith(false);
      });
    });
  });
});
