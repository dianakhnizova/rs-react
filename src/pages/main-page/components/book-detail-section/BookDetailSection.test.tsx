import { fireEvent, render, screen } from '@testing-library/react';
import { messages as detailPageMessages } from './messages';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookDetailSection } from './BookDetailSection';
import { useGetBookByIdQuery } from '@/api/book.api';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/utils/ThemeContext';

const mockNavigateToList = vi.fn();

vi.mock('@/api/book.api', async () => {
  const actual =
    await vi.importActual<typeof import('@/api/book.api')>('@/api/book.api');

  return {
    ...actual,
    useGetBookByIdQuery: vi.fn(),
  };
});

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    currentPage: 1,
    navigateToList: mockNavigateToList,
  }),
}));

describe('BookDetailSection', () => {
  it('Renders error message if bookDetails is null', () => {
    const mockedUseGetBookByIdQuery =
      useGetBookByIdQuery as unknown as ReturnType<typeof vi.fn>;

    mockedUseGetBookByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { status: 404, data: { message: 'Book not found' } },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1/123']}>
          <ThemeProvider>
            <BookDetailSection />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Error 404: {"message":"Book not found"}')
    ).toBeInTheDocument();
  });

  it('Calls navigateToList with currentPage when close button is clicked', () => {
    const mockedUseGetBookByIdQuery =
      useGetBookByIdQuery as unknown as ReturnType<typeof vi.fn>;

    mockedUseGetBookByIdQuery.mockReturnValue({
      data: {
        id: '123',
        title: 'Test Book',
        bookDetails: {
          description: 'Test description',
          authors: 'Author A',
          year: '2020',
          pages: '123',
        },
      },
      isFetching: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/1/123']}>
          <ThemeProvider>
            <BookDetailSection />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    const closeButton = screen.getByRole('button', {
      name: detailPageMessages.closeButton,
    });

    fireEvent.click(closeButton);

    expect(mockNavigateToList).toHaveBeenCalledWith(1);
  });
});
