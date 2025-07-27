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
});
