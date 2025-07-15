import { SearchSection } from './SearchSection';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('SearchSection - rendering', () => {
  it('Renders search input and search button', () => {
    render(<SearchSection onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });
});

describe('SearchSection — localStorage', () => {
  const MOCKED_VALUE = 'react testing';

  beforeEach(() => {
    localStorage.setItem('searchInput', MOCKED_VALUE);
  });

  it('Displays previously saved search term from localStorage on mount', () => {
    render(<SearchSection onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue(MOCKED_VALUE);
  });
});

describe('SearchSection — localStorage fallback', () => {
  beforeEach(() => {
    localStorage.removeItem('searchInput');
  });

  it('Shows empty input when no saved term exists', () => {
    render(<SearchSection onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('');
  });
});

describe('SearchSection — user input', () => {
  beforeEach(() => {
    localStorage.removeItem('searchInput');
  });

  it('Updates input value when user types', async () => {
    render(<SearchSection onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);

    await userEvent.clear(input);
    await userEvent.type(input, 'frontend');

    expect(input).toHaveValue('frontend');
  });
});

describe('SearchSection — saved в localStorage', () => {
  const TEST_VALUE = 'unit test';

  beforeEach(() => {
    localStorage.clear();
  });

  it('Saves search term to localStorage when search button is clicked', async () => {
    render(<SearchSection onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.clear(input);
    await userEvent.type(input, TEST_VALUE);
    await userEvent.click(button);

    expect(localStorage.getItem('searchInput')).toBe(TEST_VALUE);
  });
});
