import { render, screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { RefreshButton } from './RefreshButton';
import { bookApi } from '@/api/book.api';
import { messages } from './messages';
import * as reactRedux from 'react-redux';

vi.mock('react-redux', async () => {
  const actual =
    await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('RefreshButton', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (reactRedux.useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  it('Renders the refresh button with correct label', () => {
    render(<RefreshButton />);

    expect(
      screen.getByRole('button', { name: messages.refreshButton })
    ).toBeInTheDocument();
  });

  it('Dispatches invalidateTags with correct payload on click', async () => {
    render(<RefreshButton />);

    const button = screen.getByRole('button', { name: messages.refreshButton });

    await userEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(
      bookApi.util.invalidateTags([{ type: 'Books' }])
    );
  });
});
