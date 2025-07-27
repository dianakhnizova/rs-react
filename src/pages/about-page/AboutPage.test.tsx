import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { describe, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { mockedNavigate } from '@/utils/moks/useNavigateMock';

describe('AboutPage', () => {
  it('Renders AboutPage content correctly', () => {
    render(<AboutPage />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /rs school/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('https://'));

    const button = screen.getByRole('button', { name: /Back/i });
    expect(button).toBeInTheDocument();
  });

  it('Navigates to main page on button click', async () => {
    mockedNavigate.mockClear();

    render(<AboutPage />);

    const button = screen.getByRole('button', { name: /Back/i });
    await userEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
