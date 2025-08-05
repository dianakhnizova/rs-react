import { useState, useEffect } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Outlet } from 'react-router-dom';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useGetBooksListQuery } from '@/api/book.api';
import { Flyout } from '@/components/flyout/Flyout';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';

export const MainPage = () => {
  const { searchTerm, handleSearchQuery } = useSearchQuery();
  const { isValidPage, currentPage, redirectToNotFound, navigateToBookDetail } =
    useNavigationToPath();

  const [errorMessage, setErrorMessage] = useState('');

  const { data, isFetching, isError, error } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
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

  const books = data?.books || [];
  const totalItems = data?.totalItems || 0;

  return (
    <main data-testid="main-page" className={styles.container}>
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
            isFetching={isFetching}
          />
        </BooksSection>

        <Outlet />
      </div>

      <RefreshButton />

      <Flyout />
    </main>
  );
};
