import { cartReducer } from '@/store/slices/cart/cart.slice';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Flyout } from './Flyout';
import { IBookData } from '@/sources/interfaces';
import { ThemeProvider } from '@/utils/ThemeContext';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ITEMS_PER_FLYOUT } from '@/sources/constants';
import * as SliderComponent from '../slider/Slider';

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

  it('Renders Slider when cart.length > ITEMS_PER_FLYOUT', () => {
    const mockCartItems = Array.from(
      { length: ITEMS_PER_FLYOUT + 1 },
      (_, i) => ({
        id: `${i + 1}`,
        title: `Book ${i + 1}`,
        image: '',
        bookDetails: {
          description: '',
          authors: `Author ${i + 1}`,
          year: '2020',
        },
      })
    );

    const store = createTestStore({
      cart: {
        cart: mockCartItems,
      },
    });

    const sliderSpy = vi.spyOn(SliderComponent, 'Slider');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Flyout />
        </ThemeProvider>
      </Provider>
    );

    expect(sliderSpy).toHaveBeenCalled();
    expect(screen.queryByText(/book 1/i)).toBeInTheDocument();
  });
});
