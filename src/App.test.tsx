import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('renders Header, Main, and Footer correctly', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
