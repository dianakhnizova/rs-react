import { NotFoundPage } from './NotFoundPage';
import { render, screen } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { messages } from './messages';
import userEvent from '@testing-library/user-event';

describe('NotFoundPage', () => {
  it('Renders 404 image and navigation button', () => {
    render(<NotFoundPage />);

    const image = screen.getByRole('img', { name: messages.imgTitle });
    expect(image).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: messages.navigateMainButton,
    });
    expect(button).toBeInTheDocument();
  });

  it('Navigates to main page on button click', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);

    render(<NotFoundPage />);

    const button = screen.getByRole('button', {
      name: messages.navigateMainButton,
    });
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
