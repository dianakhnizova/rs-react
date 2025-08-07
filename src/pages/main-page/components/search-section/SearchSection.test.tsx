import { SearchSection } from './SearchSection';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <SearchSection />
    </Provider>
  );

const getInput = () => screen.getByPlaceholderText(/search/i);

describe('SearchSection', () => {
  it('Renders search input and search button', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('Updates input value when user types', async () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'frontend');

    expect(getInput()).toHaveValue('frontend');
  });
});
