import { render, screen } from '@testing-library/react';
import { BooksDetails } from './BooksDetails';
import { messages } from './messages';
import { IBookData } from '@/sources/interfaces';
import { ThemeProvider } from '@/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ReactElement } from 'react';

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <Provider store={store}>
      <ThemeProvider>{ui}</ThemeProvider>
    </Provider>
  );
};

describe('BooksDetails', () => {
  const baseBook: IBookData = {
    id: '1',
    title: 'Test Book',
    image: 'https://example.com/image.jpg',
    bookDetails: {
      description: 'A test description',
      authors: 'Author Name',
      first_publish_date: '2024',
    },
  };

  it('Renders BookCard with provided book details', () => {
    renderWithProviders(<BooksDetails bookDetail={baseBook} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('A test description')).toBeInTheDocument();
    expect(screen.getByText('Author Name')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('Renders fallback text if some details are missing', () => {
    const incompleteBook: IBookData = {
      id: '2',
      title: '',
      image: '',
      bookDetails: {
        description: '',
        authors: '',
        first_publish_date: '',
      },
    };

    renderWithProviders(<BooksDetails bookDetail={incompleteBook} />);

    expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();
    expect(screen.getByText(messages.titleNotAuthor)).toBeInTheDocument();
    expect(
      screen.getByText(messages.titleNotPublishedDate)
    ).toBeInTheDocument();
  });
});
