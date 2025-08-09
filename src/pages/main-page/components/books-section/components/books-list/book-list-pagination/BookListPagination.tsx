import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { selectSearchTerm } from '@/store/slices/search/selectors';
import {
  selectCurrentPage,
  selectTotalItems,
} from '@/store/slices/pagination/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { useGetBooksListQuery } from '@/api/book.api';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { useEffect } from 'react';
import { Pagination } from '@/components/pagination/Pagination';
import { useNavigationToPath } from '@/utils/hooks/useNavigationToPath';

export const BookListPagination = () => {
  const { navigateToPage } = useNavigationToPath();

  const searchTerm = useAppSelector(selectSearchTerm);

  const currentPage = useAppSelector(selectCurrentPage);
  const totalItems = useAppSelector(selectTotalItems);
  const { setCurrentPage, setTotalItems } = useActions();

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const { data } = useGetBooksListQuery({
    query: searchTerm,
    page: currentPage,
  });

  const handlePrev = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    void navigateToPage(newPage);
  };

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    void navigateToPage(newPage);
  };

  useEffect(() => {
    if (data?.totalItems) setTotalItems(data?.totalItems);
  }, [data, setTotalItems]);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />
  );
};
