import { render, screen, fireEvent } from '@testing-library/react';
import { BookListPagination } from './BookListPagination';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@/utils/ThemeContext';
import { paginationReducer } from '@/store/slices/pagination/pagination.slice';
import { searchReducer } from '@/store/slices/search/search.slice';
import { bookApi } from '@/api/book.api';
import { cartReducer } from '@/store/slices/cart/cart.slice';

const mockNavigateToPage = vi.fn();

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    navigateToPage: mockNavigateToPage,
  }),
}));

const mockSetCurrentPage = vi.fn();
const mockSetTotalItems = vi.fn();

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({
    setCurrentPage: mockSetCurrentPage,
    setTotalItems: mockSetTotalItems,
  }),
}));

vi.mock('@/api/book.api', async () => {
  const actual = await import('@/api/book.api');
  return {
    ...actual,
    useGetBooksListQuery: () => ({
      data: { totalItems: 30 },
    }),
  };
});

const renderWithStore = (preloadedState = {}) => {
  const rootReducer = combineReducers({
    [bookApi.reducerPath]: bookApi.reducer,
    cart: cartReducer,
    search: searchReducer,
    pagination: paginationReducer,
  });

  const store = configureStore({ reducer: rootReducer, preloadedState });

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <BookListPagination />
      </ThemeProvider>
    </Provider>
  );
};

describe('BookListPagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Calls setCurrentPage and navigateToPage with decremented value on prev click', () => {
    renderWithStore({
      pagination: { currentPage: 3, totalItems: 30 },
      search: { searchTerm: 'test' },
    });

    const buttons = screen.getAllByTestId('pagination-button');
    fireEvent.click(buttons[0]);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
    expect(mockNavigateToPage).toHaveBeenCalledWith(2);
  });

  it('Calls setCurrentPage and navigateToPage with incremented value on next click', () => {
    renderWithStore({
      pagination: { currentPage: 3, totalItems: 30 },
      search: { searchTerm: 'test' },
    });

    const buttons = screen.getAllByTestId('pagination-button');
    fireEvent.click(buttons[1]);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(4);
    expect(mockNavigateToPage).toHaveBeenCalledWith(4);
  });
});
