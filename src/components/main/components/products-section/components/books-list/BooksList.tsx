import { Component } from 'react';
import styles from './BooksList.module.scss';
import { messages } from '@/sources/messages';
import { BookCard } from '../books-cards/BookCard';
import type { BookData } from '@/sources/types';
import { fetchBooksData } from '@/api/fetchBooksData';

interface State {
  books: BookData[];
}

interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
  onClose: () => void;
  isLoading: boolean;
  setError: (message: string) => void;
}

export class BooksList extends Component<Props> {
  public state: State = {
    books: [],
  };

  public async loadBooks() {
    this.props.setLoading(true);

    try {
      const books = await fetchBooksData(this.props.searchTerm);
      this.setState({ books });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : messages.errorMessage;
      this.props.setError(message);
    } finally {
      this.props.setLoading(false);
    }
  }

  public componentDidMount(): void {
    void this.loadBooks();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      void this.loadBooks();
    }
  }

  public render() {
    const { books } = this.state;

    return (
      <>
        {books.length === 0 ? (
          <p className={styles.title}>{messages.emptyList}</p>
        ) : (
          <ul className={styles.booksContainer}>
            {books.map((book: BookData) => (
              <BookCard
                key={book.id}
                name={book.title}
                description={book.description}
                image={book.image}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}
