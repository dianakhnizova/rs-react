import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { describe, it } from 'vitest';

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
});
