import { render, screen } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { messages as bookListMessages } from './messages';
import { MemoryRouter } from 'react-router-dom';
import { IBookData } from '@/sources/interfaces';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/utils/ThemeContext';

const mockedBooks: IBookData[] = [
  {
    id: '1',
    title: 'Book One',
    image: 'image1.jpg',
    bookDetails: {
      description: 'A test description1',
      authors: 'Author Name1',
      year: '2024',
    },
  },
  {
    id: '2',
    title: 'Book Two',
    image: 'image2.jpg',
    bookDetails: {
      description: 'A test description2',
      authors: 'Author Name2',
      year: '2025',
    },
  },
];

const renderBooksList = (
  overrides?: Partial<React.ComponentProps<typeof BooksList>>
) => {
  const defaultProps = {
    books: mockedBooks,
    totalItems: 20,
    currentPage: 1,
    isFetching: false,
    onBookClick: vi.fn(),
    ...overrides,
  };

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <BooksList {...defaultProps} {...overrides} />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
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
