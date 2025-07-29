import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MainPage } from './MainPage';
import { messages as searchMessages } from './components/search-section/messages';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { useGetBooksListQuery } from '@/api/book.api';

vi.mock('@/api/book.api', () => ({
  useGetBooksListQuery: vi.fn(),
}));

const mockRedirectToNotFound = vi.fn();

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    isValidPage: false,
    currentPage: 1,
    navigateToBookDetail: vi.fn(),
    navigateToAboutPage: vi.fn(),
    redirectToNotFound: mockRedirectToNotFound,
  }),
}));

const mockedUseGetBooksListQuery = useGetBooksListQuery as ReturnType<
  typeof vi.fn
>;

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Main component', () => {
  describe('Search and loading interactions', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Updates localStorage on search', () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
      });

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
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      });

      renderWithRouter(<MainPage />);

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('Displays popup with error message on fetch failure', async () => {
      const errorMessage = 'Test error';

      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error(errorMessage),
      });

      renderWithRouter(<MainPage />);

      await waitFor(() => {
        expect(screen.getByTestId('popup')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  describe('Search input behavior', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('Trims whitespace from search input before saving', () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
      });

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

  describe('Data fetching', () => {
    it('Displays fetched book data', async () => {
      mockedUseGetBooksListQuery.mockReturnValue({
        data: {
          books: [{ id: '1', title: 'Test Book', image: 'test.jpg' }],
          totalItems: 1,
        },
        isLoading: false,
        isError: false,
      });

      renderWithRouter(<MainPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Book')).toBeInTheDocument();
      });
    });
  });

  describe('Navigation', () => {
    it('Redirects to not found if page is invalid', () => {
      renderWithRouter(<MainPage />);

      expect(mockRedirectToNotFound).toHaveBeenCalled();
    });
  });
});
