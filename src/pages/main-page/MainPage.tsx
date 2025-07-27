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
import { Outlet, useNavigate } from 'react-router-dom';
import { PagePath } from '@/router/enums';
import { useParams } from 'react-router-dom';
import { BookData } from '@/sources/types';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { fetchBooksData } from '@/api/fetchBooksData';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';
import { bookService } from '@/api/services/booksService';

export const MainPage = () => {
  const { searchTerm, handleSearchQuery } = useSearchQuery();
  const [books, setBooks] = useState<BookData[]>([]);
  const [bookDetails, setBookDetails] = useState<BookData | null>(null);

  const [totalItems, setTotalItems] = useState(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBookLoading, setIsBookLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { page: pageParam, detailsId } = useParams();
  const navigate = useNavigate();

  const isValidPage =
    pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1;
  const currentPage = isValidPage ? Math.max(1, Number(pageParam)) : 1;

  useEffect(() => {
    if (pageParam && !isValidPage) {
      void navigate(PagePath.notFound, { replace: true });
    }
  }, [pageParam, navigate]);

  const onClose = () => {
    setErrorMessage('');
  };

  const navigateToBookDetail = (bookId: string) => {
    void navigate(`/${currentPage}/${bookId}`);
  };

  const navigateToAboutPage = () => {
    void navigate(PagePath.aboutPage);
  };

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
  }, [searchTerm, currentPage, isValidPage, pageParam]);

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
          void navigate(PagePath.notFound);
          return;
        }

        setBookDetails(detailBook);
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : sourceMessages.errorMessage;

        setErrorMessage(message);

        void navigate(PagePath.notFound, { replace: true });
      } finally {
        setIsBookLoading(false);
      }
    };

    void loadBookDetails();
  }, [detailsId, navigate, isValidPage]);

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
