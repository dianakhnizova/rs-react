import { fireEvent, render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

  it('Displays RS School link with correct href', () => {
    render(<AboutPage />);

    const link = screen.getByRole('link', { name: /rs school/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringMatching(/^https?:\/\//));
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Calls navigate(-1) when back button is clicked', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
