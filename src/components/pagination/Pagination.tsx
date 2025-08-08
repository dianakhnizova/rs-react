import classNames from 'classnames';
import { Button } from '../button/Button';
import { messages } from './messages';
import styles from './Pagination.module.scss';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';
import { FC, useEffect } from 'react';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectPagination } from '@/store/slices/pagination/selectors';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useActions } from '@/utils/hooks/useActions';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';
import { useGetBooksListQuery } from '@/api/book.api';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';

export const Pagination: FC = () => {
  const { navigateToPage } = useNavigationToPath();
  const { theme } = useTheme();

  const { searchTerm } = useAppSelector(selectSearchTerm);
  const { currentPage, totalItems } = useAppSelector(selectPagination);
  const { setCurrentPage, setTotalItem } = useActions();

  const { data } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    if (data?.totalItems) setTotalItem(data?.totalItems);
  }, [data, setTotalItem]);

  const handlePrevButton = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    void navigateToPage(newPage);
  };

  const handleNextButton = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    void navigateToPage(newPage);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrevButton}
        disabled={currentPage === 1}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, {
          [styles.arrowPrevLightButton]: theme === Theme.LIGHT,
        })}
        data-testid="pagination-button"
      />

      <p data-testid="page-number" className={styles.pageNumberContainer}>
        {messages.pageTitle}
        {currentPage}
        {messages.ofTitle}
        {totalPages}
      </p>

      <Button
        onClick={handleNextButton}
        disabled={currentPage >= totalPages}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, styles.arrowNextButton, {
          [styles.arrowNextLightButton]: theme === Theme.LIGHT,
        })}
        data-testid="pagination-button"
      />
    </div>
  );
};
