import { render, screen } from '@testing-library/react';
import { messages } from './messages';
import { vi, type Mock } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { BookDetailSection } from './BookDetailSection';
import { bookService } from '@/api/services/booksService';

vi.mock('@/api/services/booksService', () => ({
  bookService: {
    getBookById: vi.fn(),
  },
}));

describe('BookDetailSection', () => {
  it('Renders error message if bookDetails is null', () => {
    (bookService.getBookById as Mock).mockImplementation(() => {
      return Promise.resolve(null);
    });

    render(
      <MemoryRouter initialEntries={['/1/sghassajs2']}>
        <Routes>
          <Route path="/:page/:detailsId" element={<BookDetailSection />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(messages.notFoundIdTitle)).toBeInTheDocument();
  });
});
