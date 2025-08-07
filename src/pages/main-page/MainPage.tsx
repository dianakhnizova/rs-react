import { useEffect } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Outlet } from 'react-router-dom';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useGetBooksListQuery } from '@/api/book.api';
import { Flyout } from '@/components/flyout/Flyout';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';

export const MainPage = () => {
  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { isValidPage, currentPage, redirectToNotFound, navigateToBookDetail } =
    useNavigationToPath();

  const { data, isFetching, isError, error, refetch } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (!isValidPage) {
      redirectToNotFound();
    }
  }, [isValidPage, redirectToNotFound]);

  useEffect(() => {
    if (searchTerm) void refetch();
  }, []);

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

      <SearchSection />

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
