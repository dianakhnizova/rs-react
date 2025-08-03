import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';
import { ThemeContext } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { IBookData } from '@/sources/interfaces';
import React from 'react';

const mockBooks: IBookData[] = [
  {
    id: '1',
    title: 'Book 1',
    image: 'https://covers.openlibrary.org/b/id/123.jpg',
    bookDetails: {
      first_sentence: 'Description 1',
      authors: 'Author 1',
      first_publish_date: '2020',
      pages: '300',
    },
  },
  {
    id: '2',
    title: 'Book 2',
    image: 'https://covers.openlibrary.org/b/id/456.jpg',
    bookDetails: {
      first_sentence: 'Description 2',
      authors: 'Author 2',
      first_publish_date: '2021',
      pages: '250',
    },
  },
  {
    id: '3',
    title: 'Book 3',
    image: 'https://covers.openlibrary.org/b/id/789.jpg',
    bookDetails: {
      first_sentence: 'Description 3',
      authors: 'Author 3',
      first_publish_date: '2022',
    },
  },
  {
    id: '4',
    title: 'Book 4',
    image: 'https://covers.openlibrary.org/b/id/012.jpg',
    bookDetails: {
      first_sentence: 'Description 4',
      authors: 'Author 4',
      first_publish_date: '2023',
      pages: '400',
    },
  },
];

describe('Slider', () => {
  const renderWithTheme = (ui: React.ReactNode, theme = Theme.LIGHT) => {
    return render(
      <ThemeContext.Provider value={{ theme, toggleTheme: vi.fn() }}>
        {ui}
      </ThemeContext.Provider>
    );
  };

  it('Renders children correctly', () => {
    renderWithTheme(
      <Slider books={mockBooks}>
        {demonstrationBooks =>
          demonstrationBooks.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Book 3')).toBeInTheDocument();
    expect(screen.queryByText('Book 4')).not.toBeInTheDocument();
  });

  it('Disables prev button when on first slide', () => {
    vi.spyOn(React, 'useState').mockImplementationOnce(() => [1, vi.fn()]);

    renderWithTheme(
      <Slider books={mockBooks}>
        {demonstrationBooks =>
          demonstrationBooks.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    const [prevButton] = screen.getAllByRole('button');

    expect(prevButton).toBeDisabled();
  });

  it('Disables next button when on last slide', () => {
    renderWithTheme(
      <Slider books={mockBooks}>
        {demonstrationBooks =>
          demonstrationBooks.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    const [, nextButton] = screen.getAllByRole('button');

    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it('Clicking next button shows next slide content', () => {
    renderWithTheme(
      <Slider books={mockBooks}>
        {booksToShow =>
          booksToShow.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Book 2')).toBeInTheDocument();
    expect(screen.getByText('Book 3')).toBeInTheDocument();
    expect(screen.queryByText('Book 4')).not.toBeInTheDocument();

    const [, nextButton] = screen.getAllByRole('button');
    fireEvent.click(nextButton);

    expect(screen.getByText('Book 4')).toBeInTheDocument();
    expect(screen.queryByText('Book 1')).not.toBeInTheDocument();
  });

  it('Clicking prev button returns to previous slide content', () => {
    renderWithTheme(
      <Slider books={mockBooks}>
        {booksToShow =>
          booksToShow.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    const [prevButton, nextButton] = screen.getAllByRole('button');
    fireEvent.click(nextButton);

    expect(screen.getByText('Book 4')).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.queryByText('Book 4')).not.toBeInTheDocument();
  });

  it('Resets currentSlide if books length is reduced and currentSlide becomes invalid', () => {
    const { rerender } = renderWithTheme(
      <Slider books={mockBooks}>
        {booksToShow =>
          booksToShow.map(book => <div key={book.id}>{book.title}</div>)
        }
      </Slider>
    );

    const [, nextButton] = screen.getAllByRole('button');
    fireEvent.click(nextButton);

    expect(screen.getByText('Book 4')).toBeInTheDocument();

    const reducedBooks = mockBooks.slice(0, 3);

    rerender(
      <ThemeContext.Provider
        value={{ theme: Theme.LIGHT, toggleTheme: vi.fn() }}
      >
        <Slider books={reducedBooks}>
          {booksToShow =>
            booksToShow.map(book => <div key={book.id}>{book.title}</div>)
          }
        </Slider>
      </ThemeContext.Provider>
    );

    expect(screen.getByText('Book 1')).toBeInTheDocument();
    expect(screen.queryByText('Book 4')).not.toBeInTheDocument();
  });
});
