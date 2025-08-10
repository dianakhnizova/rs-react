import { render, screen } from '@testing-library/react';
import { BooksList } from './BooksList';
import { vi } from 'vitest';
import { messages as bookListMessages } from './messages';
import { MemoryRouter, useParams } from 'react-router-dom';
import { IBookData } from '@/sources/interfaces';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/utils/ThemeContext';
import { useGetBooksListQuery } from '@/api/book.api';
import { getErrorMessage } from '@/utils/getErrorMessage';

vi.mock('@/api/book.api', async () => {
  const actual =
    await vi.importActual<typeof import('@/api/book.api')>('@/api/book.api');
  return {
    ...actual,
    useGetBooksListQuery: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
    useParams: vi.fn(),
  };
});

const mockedBooks: IBookData[] = [
  {
    id: '1',
    title: 'Book One',
    image: 'image1.jpg',
    bookDetails: {
      first_sentence: 'A test description1',
      authors: 'Author Name1',
      first_publish_date: '2024',
    },
  },
  {
    id: '2',
    title: 'Book Two',
    image: 'image2.jpg',
    bookDetails: {
      first_sentence: 'A test description2',
      authors: 'Author Name2',
      first_publish_date: '2025',
    },
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  (useGetBooksListQuery as ReturnType<typeof vi.fn>).mockReturnValue({
    data: { books: mockedBooks, totalItems: mockedBooks.length },
    isFetching: false,
    isError: false,
    error: null,
  });
  (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
    detailsId: undefined,
  });
});

const renderBooksList = () => {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter>
          <BooksList />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('BookList', () => {
  describe('BooksList - Rendering', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      (useParams as ReturnType<typeof vi.fn>).mockReturnValue({
        detailsId: undefined,
      });
    });

    it('Renders correct number of items', () => {
      renderBooksList();

      expect(screen.getAllByRole('listitem')).toHaveLength(mockedBooks.length);
    });

    it('Renders "Not books for you" when empty array', async () => {
      (useGetBooksListQuery as ReturnType<typeof vi.fn>).mockReturnValue({
        data: { books: [], totalItems: 0 },
        isFetching: false,
        isError: false,
        error: null,
      });

      renderBooksList();

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

    it('Shows spinner when loading', () => {
      (useGetBooksListQuery as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isFetching: true,
        isError: false,
        error: null,
      });

      renderBooksList();

      const spinner = screen.getByTestId('spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('Shows error popup when there is an error', () => {
      const fakeError = { status: 500, data: 'Internal Server Error' };

      (useGetBooksListQuery as ReturnType<typeof vi.fn>).mockReturnValue({
        data: undefined,
        isFetching: false,
        isError: true,
        error: fakeError,
      });

      renderBooksList();

      const popup = screen.getByTestId('popup');
      expect(popup).toBeInTheDocument();
      expect(screen.getByText(getErrorMessage(fakeError))).toBeInTheDocument();
    });
  });
});
