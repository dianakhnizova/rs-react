import { ITEMS_PER_PAGE } from '@/sources/constants';
import { FC } from 'react';
import { Pagination } from '@/components/pagination/Pagination';

interface Props {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export const BookListPagination: FC<Props> = ({
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePrev={handlePrev}
      handleNext={handleNext}
    />
  );
};
