import { SearchSection } from './SearchSection';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const renderComponent = (onSearch = vi.fn()) =>
  render(<SearchSection onSearch={onSearch} />);
const getInput = () => screen.getByPlaceholderText(/search/i);

describe('SearchSection', () => {
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
      renderComponent();

      expect(getInput()).toHaveValue(MOCKED_VALUE);
    });
  });

  describe('SearchSection — localStorage fallback', () => {
    beforeEach(() => {
      localStorage.removeItem('searchInput');
    });

    it('Shows empty input when no saved term exists', () => {
      renderComponent();

      expect(getInput()).toHaveValue('');
    });
  });

  describe('SearchSection — user input', () => {
    beforeEach(() => {
      localStorage.removeItem('searchInput');
    });

    it('Updates input value when user types', async () => {
      renderComponent();
      const input = screen.getByPlaceholderText(/search/i);

      await userEvent.clear(input);
      await userEvent.type(input, 'frontend');

      expect(getInput()).toHaveValue('frontend');
    });
  });

  describe('SearchSection — trimmed', () => {
    beforeEach(() => {
      localStorage.clear();
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
});
