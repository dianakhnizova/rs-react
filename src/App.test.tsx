import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('renders the app without crashing', async () => {
    render(<App />);

    await screen.findByRole('main');
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});
