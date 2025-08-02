import { render, screen } from '@testing-library/react';
import { DownloadBooksButton } from './DownloadBooksButton';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '@/store/slices/cart/cart.slice';
import { ThemeProvider } from '@/utils/ThemeContext';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('@/utils/downloadBooksCsv', () => ({
  downloadBooksCsv: vi.fn(),
}));

import { downloadBooksCsv } from '@/utils/downloadBooksCsv';

const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });

describe('DownloadBooksButton', () => {
  it('Renders download button and triggers downloadBooksCsv on click', async () => {
    const user = userEvent.setup();

    const mockCart = [
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
    ];

    const store = createTestStore({
      cart: {
        cart: mockCart,
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <DownloadBooksButton />
        </ThemeProvider>
      </Provider>
    );

    const button = screen.getByRole('button', { name: /download/i });
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(downloadBooksCsv).toHaveBeenCalledWith(mockCart, expect.any(Object));
  });
});
