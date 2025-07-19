import { render, screen, waitFor } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { fetchBooksData } from '@/api/fetchBooksData';
import type { BookData } from '@/sources/types';

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

describe('BooksList - Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Renders correct number of items when data is provided', async () => {
    mockedFetchBooksData.mockResolvedValue(mockedBooks);

    render(
      <BooksList
        searchTerm="react"
        setLoading={() => {}}
        onClose={() => {}}
        isLoading={false}
        setError={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(mockedBooks.length);
    });
  });
});

describe('BooksList - Empty State', () => {
  it('Displays "no results" message when data array is empty', async () => {
    mockedFetchBooksData.mockResolvedValue([]);

    render(
      <BooksList
        searchTerm="React"
        setLoading={() => {}}
        onClose={() => {}}
        isLoading={false}
        setError={() => {}}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/not books for you/i)).toBeInTheDocument();
    });
  });
});

describe('BooksList - Data Display', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Correctly displays item names and descriptions', async () => {
    mockedFetchBooksData.mockResolvedValue(mockedBooks);

    render(
      <BooksList
        searchTerm="test"
        setLoading={() => {}}
        onClose={() => {}}
        isLoading={false}
        setError={() => {}}
      />
    );

    for (const book of mockedBooks) {
      await waitFor(() => {
        expect(screen.getByText(book.title)).toBeInTheDocument();
        expect(screen.getByText(book.description)).toBeInTheDocument();
      });
    }
  });
});

describe('BooksList - API call', () => {
  it('Calls fetchBooksData with correct searchTerm', async () => {
    mockedFetchBooksData.mockResolvedValue([]);

    render(
      <BooksList
        searchTerm="JavaScript"
        setLoading={() => {}}
        onClose={() => {}}
        isLoading={false}
        setError={() => {}}
      />
    );

    await waitFor(() => {
      expect(mockedFetchBooksData).toHaveBeenCalledWith('JavaScript');
    });
  });
});

describe('BooksList component - Calls API with correct parameters', () => {
  it('calls fetchBooksData with the correct search term', async () => {
    const mockSearchTerm = 'react';
    const mockSetLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockOnClose = vi.fn();

    mockedFetchBooksData.mockResolvedValue([]);

    render(
      <BooksList
        searchTerm={mockSearchTerm}
        setLoading={mockSetLoading}
        setError={mockSetError}
        onClose={mockOnClose}
        isLoading={false}
      />
    );

    await waitFor(() => {
      expect(fetchBooksData).toHaveBeenCalledWith(mockSearchTerm);
    });
  });
});

describe('BooksList - Full Render Flow', () => {
  it('calls handlers and displays fetched books correctly', async () => {
    const mockSearchTerm = 'testing';
    const mockSetLoading = vi.fn();
    const mockSetError = vi.fn();
    const mockOnClose = vi.fn();

    mockedFetchBooksData.mockResolvedValue(mockedBooks);

    render(
      <BooksList
        searchTerm={mockSearchTerm}
        setLoading={mockSetLoading}
        setError={mockSetError}
        onClose={mockOnClose}
        isLoading={false}
      />
    );

    expect(mockSetLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(mockedFetchBooksData).toHaveBeenCalledWith(mockSearchTerm);
      for (const book of mockedBooks) {
        expect(screen.getByText(book.title)).toBeInTheDocument();
        expect(screen.getByText(book.description)).toBeInTheDocument();
      }
    });

    expect(mockSetLoading).toHaveBeenLastCalledWith(false);

    expect(mockSetError).not.toHaveBeenCalled();
  });
});
