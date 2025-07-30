import { useState, useEffect } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { Spinner } from '@/components/spinner/Spinner';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Button } from '@/components/button/Button';
import { messages as mainMessages } from './messages';
import { Outlet } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useGetBooksListQuery } from '@/api/book.api';

export const MainPage = () => {
  const { searchTerm, handleSearchQuery } = useSearchQuery();
  const {
    isValidPage,
    currentPage,
    redirectToNotFound,
    navigateToBookDetail,
    navigateToAboutPage,
  } = useNavigationToPath();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, isLoading, isError, error } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (!isValidPage) {
      redirectToNotFound();
    }
  }, [isValidPage, redirectToNotFound]);

  useEffect(() => {
    if (isError && error && 'message' in error) {
      setErrorMessage(error.message ?? '');
    }
  }, [isError, error]);

  const onClose = () => {
    setErrorMessage('');
  };

  console.log(data);
  const books = data ? data.books : [];
  const totalItems = data?.totalItems ?? 0;

  return (
    <main data-testid="main-page" className={styles.container}>
      <Spinner isLoading={isLoading} data-testid="spinner" />

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

        <Outlet />
      </div>

      <Button onClick={navigateToAboutPage}>
        {mainMessages.toAboutPageButton}
      </Button>
    </main>
  );
};
