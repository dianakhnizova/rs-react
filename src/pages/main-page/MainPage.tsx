import { useEffect } from 'react';
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
import { getErrorMessage } from '@/utils/getErrorMessage';

export const MainPage = () => {
  const { searchTerm, handleSearchQuery } = useSearchQuery();
  const { isValidPage, currentPage, redirectToNotFound, navigateToBookDetail } =
    useNavigationToPath();

  const { data, isFetching, isError, error } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (!isValidPage) {
      redirectToNotFound();
    }
  }, [isValidPage, redirectToNotFound]);

  const books = data?.books || [];
  const totalItems = data?.totalItems || 0;

  return (
    <main data-testid="main-page" className={styles.container}>
      <Popup
        isOpen={!!isError}
        isError
        error={getErrorMessage(error)}
        data-testid="popup"
      />

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
