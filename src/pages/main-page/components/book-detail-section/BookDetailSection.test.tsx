import { render, screen } from '@testing-library/react';
import { messages as detailPageMessages } from './messages';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { BookDetailSection } from './BookDetailSection';
import { useGetBookByIdQuery } from '@/api/book.api';

vi.mock('@/api/book.api', () => ({
  useGetBookByIdQuery: vi.fn(),
}));

vi.mock('@/utils/hooks/useNavigationToPath', () => ({
  useNavigationToPath: () => ({
    currentPage: 1,
    navigateToList: vi.fn(),
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
    });

    render(
      <MemoryRouter initialEntries={['/1/sghassajs2']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<BookDetailSection />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(detailPageMessages.notFoundIdTitle)
    ).toBeInTheDocument();
  });
});
