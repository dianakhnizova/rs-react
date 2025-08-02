import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { MemoryRouter } from 'react-router-dom';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { IBookData } from '@/sources/interfaces';
import { ThemeProvider } from '@/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

const mockBook: IBookData = {
  id: '1',
  title: 'Test Book',
  image: 'test.jpg',
  bookDetails: {
    description: 'Test description',
    authors: 'Test Author',
    year: '2020',
    pages: '100',
  },
};

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <MemoryRouter>
      <Provider store={store}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>
    </MemoryRouter>
  );

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    renderWithProviders(
      <BookCard
        book={mockBook}
        details={[
          { value: 'Test Description', className: 'desc' },
          { value: 'Test Author', className: 'author' },
          { value: 100, className: 'pageCount' },
          { value: 'Book', className: 'printType' },
        ]}
      />
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Book');

    expect(
      screen.getByText(text => text.includes('Test Description'))
    ).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getAllByText(/Book/i)).toHaveLength(2);
  });

  it('Falls back to placeholder image if no image is provided', () => {
    const bookWithoutImage = { ...mockBook, image: '' };

    renderWithProviders(<BookCard book={bookWithoutImage} details={[]} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', BookPlaceholder);
    expect(image).toHaveAttribute('alt', 'Test Book');
  });

  it('Skips rendering details with falsy values', () => {
    renderWithProviders(
      <BookCard
        book={mockBook}
        details={[
          { value: 'Visible Detail', className: 'desc' },
          { value: '', className: 'author' },
          { value: '', className: 'pageCount' },
          { value: '', className: 'printType' },
          { value: 0, className: 'year' },
        ]}
      />
    );

    expect(screen.getByText(/Visible Detail/i)).toBeInTheDocument();
    expect(screen.queryByText(/author/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pageCount/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/printType/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^0$/)).not.toBeInTheDocument();
  });
});
