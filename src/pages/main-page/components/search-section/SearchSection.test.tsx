import { SearchSection } from './SearchSection';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderComponent = (onSearch = vi.fn()) =>
  render(<SearchSection onSearch={onSearch} searchTerm="" />);
const getInput = () => screen.getByPlaceholderText(/search/i);

describe('SearchSection', () => {
  it('Renders search input and search button', () => {
    render(<SearchSection onSearch={vi.fn()} searchTerm="" />);

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
