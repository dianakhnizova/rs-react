import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import { messages as searchMessages } from './components/search-section/messages';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { bookApi, useGetBooksListQuery } from '@/api/book.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { cartReducer } from '@/store/slices/cart/cart.slice';
import { ThemeProvider } from '@/utils/ThemeContext';

vi.mock('@/api/book.api', async () => {
  const actual = await import('@/api/book.api');
  return {
    ...actual,
    useGetBooksListQuery: vi.fn(),
  };
});

const mockRedirectToNotFound = vi.fn();

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    isValidPage: false,
    currentPage: 1,
    navigateToBookDetail: vi.fn(),
    navigateToAboutPage: vi.fn(),
    redirectToNotFound: mockRedirectToNotFound,
  }),
}));

const mockedUseGetBooksListQuery = useGetBooksListQuery as ReturnType<
  typeof vi.fn
>;

const rootReducer = combineReducers({
  [bookApi.reducerPath]: bookApi.reducer,
  cart: cartReducer,
});

const store = configureStore({ reducer: rootReducer });

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('Main component', () => {
  describe('Search and loading interactions', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Updates localStorage on search', () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
      });

      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );

      fireEvent.change(input, { target: { value: 'react' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });

      fireEvent.click(button);

      expect(localStorage.getItem('searchInput')).toBe('react');
    });

    it('Displays popup with error message on fetch failure', async () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: { status: 500, data: { message: 'Test error' } },
      });

      renderWithRouter(<MainPage />);

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeInTheDocument();
        expect(
          screen.getByText(content => content.includes('Test error'))
        ).toBeInTheDocument();
      });
    });
  });

  describe('Search input behavior', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Trims whitespace from search input before saving', () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
      });

      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );

      fireEvent.change(input, { target: { value: '   react   ' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });

      fireEvent.click(button);

      expect(localStorage.getItem('searchInput')).toBe('react');
    });
  });

  describe('Data fetching', () => {
    it('Displays fetched book data', async () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: {
          books: [{ id: '1', title: 'Test Book', image: 'test.jpg' }],
          totalItems: 1,
        },
        isLoading: false,
        isError: false,
      });

      renderWithRouter(<MainPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Book')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('Redirects to not found if page is invalid', () => {
      renderWithRouter(<MainPage />);

      expect(mockRedirectToNotFound).toHaveBeenCalled();
    });
  });
});
