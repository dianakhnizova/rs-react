import { render, screen } from '@testing-library/react';
import { BooksDetails } from './BooksDetails';
import { messages } from './messages';
import type { BookData } from '@/sources/types';

describe('BooksDetails', () => {
  const baseBook: BookData = {
    id: '1',
    title: 'Test Book',
    image: 'https://example.com/image.jpg',
    description: 'A test description',
    authors: 'Author Name',
    year: '2024',
    printType: 'Book',
  };

  it('Renders BookCard with provided book details', () => {
    render(<BooksDetails bookDetail={baseBook} />);

    expect(
      screen.getByText(baseBook.title?.toUpperCase() ?? '')
    ).toBeInTheDocument();
    expect(screen.getByText(baseBook.description ?? '')).toBeInTheDocument();
    expect(screen.getByText(baseBook.authors ?? '')).toBeInTheDocument();
    expect(screen.getByText(baseBook.year ?? '')).toBeInTheDocument();
    expect(screen.getByText(baseBook.printType ?? '')).toBeInTheDocument();
  });

  it('Renders fallback text if some details are missing', () => {
    const incompleteBook: BookData = {
      id: '2',
      title: '',
      image: '',
      description: '',
      authors: '',
      year: '',
      printType: '',
    };

    render(<BooksDetails bookDetail={incompleteBook} />);

    expect(screen.getByText(messages.titleNot)).toBeInTheDocument();
    expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();
    expect(screen.getByText(messages.titleNotAuthor)).toBeInTheDocument();
    expect(screen.getByText(messages.titleNotPageCount)).toBeInTheDocument();
    expect(screen.getByText(messages.titleNotPrintType)).toBeInTheDocument();
  });
});
