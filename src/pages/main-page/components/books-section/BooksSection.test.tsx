import { render, screen } from '@testing-library/react';
import { BooksSection } from './BooksSection';
import { vi } from 'vitest';

vi.mock('./components/book-list-header/BookListHeader', () => ({
  BookListHeader: () => <div data-testid="book-list-header">Mock Header</div>,
}));

vi.mock('./components/books-list/BooksList', () => ({
  BooksList: () => <div data-testid="books-list">Mock Books List</div>,
}));

describe('BooksSection', () => {
  it('renders BookListHeader and BooksList', () => {
    render(<BooksSection />);

    expect(screen.getByTestId('book-list-header')).toBeInTheDocument();
    expect(screen.getByTestId('books-list')).toBeInTheDocument();
  });
});
