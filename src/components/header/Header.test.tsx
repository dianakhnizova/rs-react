import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { messages } from './messages';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  it('Renders the header with correct title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const header = screen.getByRole('banner');

    expect(header).toBeInTheDocument();
    expect(screen.getByText(messages.appTitle)).toBeInTheDocument();
  });
});
