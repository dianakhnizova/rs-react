import { useState, useEffect } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { Spinner } from '@/components/spinner/Spinner';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Button } from '@/components/button/Button';
import { messages as mainMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { Outlet, useParams } from 'react-router-dom';
import { BookData } from '@/sources/types';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { fetchBooksData } from '@/api/fetchBooksData';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';
import { bookService } from '@/api/services/booksService';
import { useNavigation } from '@/utils/hooks/useNavigation';

export const MainPage = () => {
  const { searchTerm, handleSearchQuery } = useSearchQuery();
  const {
    isValidPage,
    currentPage,
    redirectToNotFound,
    navigateToBookDetail,
    navigateToAboutPage,
  } = useNavigation();

  const [books, setBooks] = useState<BookData[]>([]);
  const [bookDetails, setBookDetails] = useState<BookData | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [totalItems, setTotalItems] = useState(0);

  const { detailsId } = useParams();

  useEffect(() => {
    if (!isValidPage) {
      redirectToNotFound();
    }
  }, [isValidPage, redirectToNotFound]);

  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);

      try {
        const { booksList, totalItems } = await fetchBooksData(
          searchTerm,
          currentPage,
          ITEMS_PER_PAGE
        );

        setBooks(booksList);
        setTotalItems(totalItems);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    void loadBooks();
  }, [searchTerm, currentPage, isValidPage]);

  useEffect(() => {
    const loadBookDetails = async () => {
      if (!detailsId) {
        setBookDetails(null);
        return;
      }
      setIsBookLoading(true);
      try {
        const detailBook = await bookService.getBookById(detailsId);

        if (!detailBook) {
          redirectToNotFound();
          return;
        }

        setBookDetails(detailBook);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        setErrorMessage(message);

        redirectToNotFound();
      } finally {
        setIsBookLoading(false);
      }
    };

    void loadBookDetails();
  }, [redirectToNotFound]);

  const onClose = () => {
    setErrorMessage('');
  };

  return (
    <main data-testid="main-page" className={styles.container}>
      <Spinner isLoading={isLoading || isBookLoading} />

      <Popup isOpen={!!errorMessage} onClose={onClose} data-testid="popup">
        <p className={styles.error}>{errorMessage}</p>
      </Popup>

      <SearchSection onSearch={handleSearchQuery} searchTerm={searchTerm} />

      <div className={styles.content}>
        <BooksSection>
          <BooksList
            books={books}
            totalItems={totalItems}
            currentPage={currentPage}
            onBookClick={navigateToBookDetail}
          />
        </BooksSection>

        <Outlet context={{ bookDetails }} />
      </div>

      <Button onClick={navigateToAboutPage}>
        {mainMessages.toAboutPageButton}
      </Button>
    </main>
  );
};
