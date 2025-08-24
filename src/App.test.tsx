import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

vi.mock('./pages/HomePage', () => ({
  HomePage: () => <div>Home Page Content</div>,
}));

describe('App component', () => {
  it('renders HomePage inside Provider', () => {
    render(<App />);

    expect(screen.getByText(/Home Page Content/i)).toBeInTheDocument();
  });
});
