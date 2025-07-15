import { render, screen, waitFor } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { fetchBooksData } from '@/api/fetchBooksData';
import type { BookData } from '@/sources/types';

vi.mock('@/api/fetchBooksData');

const mockedFetchBooksData = fetchBooksData as unknown as ReturnType<
  typeof vi.fn
>;

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
