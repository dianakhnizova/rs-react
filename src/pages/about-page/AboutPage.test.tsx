import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { describe, it, vi, type Mock } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';

describe('AboutPage', () => {
  it('renders AboutPage content correctly', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /rs school/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('https://'));

    const button = screen.getByRole('button', { name: /Back/i });
    expect(button).toBeInTheDocument();
  });

  it('navigates to main page on button click', async () => {
    const mockNavigate = vi.fn();
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);

    render(<AboutPage />);

    const button = screen.getByRole('button', { name: /Back/i });
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
