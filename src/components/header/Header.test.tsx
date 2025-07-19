import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { messages } from './messages';

describe('Header component', () => {
  it('Renders the header with correct title', () => {
    render(<Header />);

    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(screen.getByText(messages.appTitle)).toBeInTheDocument();
  });
});
