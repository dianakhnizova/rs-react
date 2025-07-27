import { render, screen } from '@testing-library/react';
import { messages } from './messages';
import { vi, type Mock } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { BookDetailSection } from './BookDetailSection';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useOutletContext: vi.fn(),
  };
});

import { useOutletContext } from 'react-router-dom';

describe('BookDetailSection', () => {
  it('Renders error message if bookDetails is null', () => {
    (useOutletContext as Mock).mockReturnValue({ bookDetails: null });

    render(
      <MemoryRouter initialEntries={['/1/123']}>
        <Routes>
          <Route path="/:page/:id" element={<BookDetailSection />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(messages.notFoundIdTitle)).toBeInTheDocument();
  });

  it('Renders book details and close button when bookDetails is provided', () => {
    const mockBook = {
      id: 'OL123W',
      title: 'Test Book',
      image: 'https://covers.openlibrary.org/b/id/12345-M.jpg',
      authors: 'Author One',
      year: '2024',
      description: 'Test description.',
      printType: 'book',
    };

    (useOutletContext as Mock).mockReturnValue({ bookDetails: mockBook });

    render(
      <MemoryRouter initialEntries={['/1/OL123W']}>
        <Routes>
          <Route path="/:page/:id" element={<BookDetailSection />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(mockBook.title.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(mockBook.authors)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.closeButton })
    ).toBeInTheDocument();
  });
});
