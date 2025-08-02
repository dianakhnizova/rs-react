import { cartReducer } from '@/store/slices/cart/cart.slice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Flyout } from './Flyout';
import { IBookData } from '@/sources/interfaces';
import { ThemeProvider } from '@/utils/ThemeContext';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { downloadBooksCsv } from '@/utils/downloadBooksCsv';

vi.mock('@/utils/downloadBooksCsv', () => ({
  downloadBooksCsv: vi.fn(),
}));

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

describe('Flyout', () => {
  it('Shows empty message when cart is empty', () => {
    const store = createTestStore({
      cart: {
        cart: [],
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/empty cart/i)).toBeInTheDocument();
  });

  it('Displays cart items and buttons when cart is not empty', () => {
    const mockCartItem: IBookData = {
      id: '1',
      title: 'Test Book',
      image: '',
      bookDetails: {
        description: 'Test description',
        authors: 'Diana',
        year: '2025',
      },
    };

    const store = createTestStore({
      cart: {
        cart: [mockCartItem],
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/1/i)).toBeInTheDocument();
    expect(screen.getByText(/test book/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /unselect all/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('Unselect all - button clears selection', async () => {
    const user = userEvent.setup();

    const mockCartItem: IBookData = {
      id: '1',
      title: 'Test Book',
      image: '',
      bookDetails: {
        description: 'Test description',
        authors: 'Diana',
        year: '2025',
      },
    };

    const store = createTestStore({
      cart: {
        cart: [mockCartItem],
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    expect(unselectButton).toBeInTheDocument();

    await user.click(unselectButton);
  });

  it('Displays correct number of items in cart', () => {
    const mockCartItems: IBookData[] = [
      {
        id: '1',
        title: 'Book One',
        image: '',
        bookDetails: {
          description: '',
          authors: 'Author 1',
          year: '2020',
        },
      },
      {
        id: '2',
        title: 'Book Two',
        image: '',
        bookDetails: {
          description: '',
          authors: 'Author 2',
          year: '2021',
        },
      },
      {
        id: '3',
        title: 'Book Three',
        image: '',
        bookDetails: {
          description: '',
          authors: 'Author 3',
          year: '2022',
        },
      },
    ];

    const store = createTestStore({
      cart: {
        cart: mockCartItems,
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/book one/i)).toBeInTheDocument();
    expect(screen.getByText(/book two/i)).toBeInTheDocument();
    expect(screen.getByText(/book three/i)).toBeInTheDocument();

    expect(screen.getByText(/items are selected/i)).toBeInTheDocument();
  });

  it('Calls downloadBooksCsv with cart items when Download button is clicked', () => {
    const mockCartItem: IBookData = {
      id: '1',
      title: 'Test Book',
      image: '',
      bookDetails: {
        description: 'Description',
        authors: 'Author',
        year: '2025',
      },
    };

    const store = createTestStore({
      cart: {
        cart: [mockCartItem],
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    const downloadButton = screen.getByRole('button', { name: /download/i });
    downloadButton.click();

    expect(downloadBooksCsv).toHaveBeenCalledTimes(1);
    expect(downloadBooksCsv).toHaveBeenCalledWith(
      [mockCartItem],
      expect.objectContaining({
        current: expect.any(HTMLAnchorElement),
      })
    );
  });
});
