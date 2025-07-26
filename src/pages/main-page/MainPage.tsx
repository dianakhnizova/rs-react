import { useState, useEffect } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { Spinner } from '@/components/spinner/Spinner';
import { LocalStorage } from '@/sources/enums';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Button } from '@/components/button/Button';
import { messages as mainMessages } from './messages';
import { messages as sourceMessages } from '@/sources/messages';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PagePath } from '@/router/enums';
import { useSearchParams } from 'react-router-dom';
import { BookData } from '@/sources/types';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { fetchBooksData } from '@/api/fetchBooksData';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    (localStorage.getItem(LocalStorage.SEARCH_KEY) || '').trim()
  );
  const [books, setBooks] = useState<BookData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const pageFromURL = Number(searchParams.get('page') || '1') || 1;
  const currentPage = Math.max(1, pageFromURL);
  const navigate = useNavigate();

  const isDetailPage = !!id;

  const handleSearchQuery = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setBooks([]);
    setErrorMessage('');
    localStorage.setItem(LocalStorage.SEARCH_KEY, searchTerm.trim());
    setSearchParams({ page: '1' });
  };

  const onClose = () => {
    setErrorMessage('');
  };

  const navigateToBookDetail = (bookId: string) => {
    void navigate(
      `${PagePath.bookDetailSection.replace(':id', bookId)}?page=${currentPage}`
    );
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
  }, [searchTerm, currentPage]);

  return (
    <main data-testid="main-page" className={styles.container}>
      <Spinner isLoading={isLoading} />

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
            setSearchParams={setSearchParams}
            onBookClick={navigateToBookDetail}
          />
        </BooksSection>

        {isDetailPage && <Outlet />}
      </div>

      <Button onClick={navigateToAboutPage}>
        {mainMessages.toAboutPageButton}
      </Button>
    </main>
  );
};
