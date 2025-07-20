import { SearchSection } from './SearchSection';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderComponent = (onSearch = vi.fn()) =>
  render(<SearchSection onSearch={onSearch} />);
const getInput = () => screen.getByPlaceholderText(/search/i);

describe('SearchSection', () => {
  const MOCKED_VALUE = 'react testing';

  afterEach(() => {
    localStorage.clear();
  });

  it('Renders search input and search button', () => {
    render(<SearchSection onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('Displays previously saved search term from localStorage on mount', async () => {
    localStorage.setItem('searchInput', MOCKED_VALUE);
    renderComponent();

    await waitFor(() => {
      expect(getInput()).toHaveValue(MOCKED_VALUE);
    });
  });

  it('Shows empty input when no saved term exists', () => {
    renderComponent();

    expect(getInput()).toHaveValue('');
  });

  it('Updates input value when user types', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/search/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'frontend');

    expect(getInput()).toHaveValue('frontend');
  });

  it('Trims whitespace from search input before saving', async () => {
    const onSearchMock = vi.fn();
    renderComponent(onSearchMock);

    const input = getInput();
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, '   frontend dev  ');
    await userEvent.click(button);

    expect(localStorage.getItem('searchInput')).toBe('frontend dev');
    expect(onSearchMock).toHaveBeenCalledWith('frontend dev');
  });
});
