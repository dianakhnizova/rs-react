import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { messages } from './messages';

describe('Footer component', () => {
  it('Renders the footer with correct text', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
    expect(screen.getByText(messages.bottomTitle)).toBeInTheDocument();
  });
});
