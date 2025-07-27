import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import { messages as searchMessages } from './components/search-section/messages';
import { MemoryRouter } from 'react-router-dom';
import * as fetchBooksDataModule from '@/api/fetchBooksData';
import { vi } from 'vitest';

const mockRedirect = vi.fn();

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    isValidPage: false,
    currentPage: 1,
    navigateToBookDetail: vi.fn(),
    navigateToAboutPage: vi.fn(),
    redirectToNotFound: mockRedirect,
  }),
}));

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

    it('Displays spinner when loading is true', () => {
      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(
        searchMessages.inputPlaceholder
      );
      fireEvent.change(input, { target: { value: 'react' } });

      const button = screen.getByRole('button', {
        name: searchMessages.searchButton,
      });

      fireEvent.click(button);

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('Displays popup with error message on fetch failure', async () => {
      const errorMessage = 'Test error';

      vi.spyOn(fetchBooksDataModule, 'fetchBooksData').mockRejectedValueOnce(
        new Error(errorMessage)
      );

      renderWithRouter(<MainPage />);

      const popup = await screen.findByTestId('popup');
      expect(popup).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
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

  describe('Navigation', () => {
    it('Redirects to not found if page is invalid', () => {
      renderWithRouter(<MainPage />);
      expect(mockRedirect).toHaveBeenCalled();
    });
  });

  describe('Data fetching', () => {
    it('Calls setBooks and setTotalItems with correct data', async () => {
      const mockBooksList = [
        {
          id: '123',
          title: 'Test Book',
          image: 'image.jpg',
        },
      ];
      const mockTotalItems = 1;

      vi.spyOn(fetchBooksDataModule, 'fetchBooksData').mockResolvedValueOnce({
        booksList: mockBooksList,
        totalItems: mockTotalItems,
      });

      renderWithRouter(<MainPage />);

      const input = screen.getByPlaceholderText(/search/i);
      fireEvent.change(input, { target: { value: 'react' } });

      const button = screen.getByRole('button', { name: /search/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Test Book')).toBeInTheDocument();
      });

      expect(screen.getByText('Test Book')).toBeInTheDocument();
    });
  });
});
