import { render, screen } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import type { BookData } from '@/sources/types';
import { messages as bookListMessages } from './messages';
import { MemoryRouter } from 'react-router-dom';

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
    books: mockedBooks,
    totalItems: 20,
    currentPage: 1,
    setSearchParams: vi.fn(),
    onBookClick: vi.fn(),
    ...overrides,
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

    it('Renders correct number of items', () => {
      renderBooksList();

      expect(screen.getAllByRole('listitem')).toHaveLength(mockedBooks.length);
    });

    it('Renders "Not books for you" when empty array', async () => {
      renderBooksList({ books: [], totalItems: 0 });

      expect(screen.getByText(bookListMessages.emptyList)).toBeInTheDocument();
    });

    it('Correctly displays item names', async () => {
      renderBooksList();

      mockedBooks.forEach(book => {
        if (book.title) {
          expect(screen.getByText(book.title)).toBeInTheDocument();
        }
      });
    });

    it('Calls onBookClick when a book is clicked', () => {
      const onBookClick = vi.fn();

      renderBooksList({ onBookClick });

      const bookItems = screen.getAllByRole('listitem');
      bookItems[0].click();

      expect(onBookClick).toHaveBeenCalledWith(mockedBooks[0].id);
    });
  });
});
