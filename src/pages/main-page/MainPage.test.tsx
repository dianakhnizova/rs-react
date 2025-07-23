import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';
import { messages as searchMessages } from './components/search-section/messages';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Main component', () => {
  describe('Search and loading interactions', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Calls onSearch and updates localStorage', () => {
      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );

      fireEvent.change(input, { target: { value: 'react' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });

      fireEvent.click(button);

      expect(localStorage.getItem('searchInput')).toBe('react');
    });

    it('Displays popup when loading is true', () => {
      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );
      fireEvent.change(input, { target: { value: 'react' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });

      fireEvent.click(button);

      expect(screen.getByTestId('popup')).toBeInTheDocument();
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Search input behavior', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Trims whitespace from search input before saving', () => {
      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );
      fireEvent.change(input, { target: { value: '   react   ' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });
      fireEvent.click(button);

      expect(localStorage.getItem('searchInput')).toBe('react');
    });
  });
});
