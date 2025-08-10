import { useNavigate, useParams } from 'react-router-dom';
import { PagePath } from '@/router/enums';
import { useCallback } from 'react';
import { useAppSelector } from './useAppSelector';
import { selectCurrentPage } from '@/store/slices/pagination/selectors';
import { useIsValidPage } from './useIsValidPage';

export const useNavigationToPath = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const currentPage = useAppSelector(selectCurrentPage);
  const isValidPage = useIsValidPage();

  const navigateToBookDetail = useCallback(
    (bookId: string) =>
      isValidPage ? `/${currentPage}/${bookId}` : PagePath.notFound,
    [currentPage, isValidPage]
  );

  const navigateToBookList = useCallback(
    (page: number) => {
      if (isValidPage) void navigate(`/${page}`);
    },
    [navigate]
  );

  const navigateToPage = useCallback(
    (page: number) => {
      if (isValidPage)
        void navigate(detailsId ? `/${page}/${detailsId}` : `/${page}`);
    },
    [navigate, detailsId]
  );

  return {
    currentPage,
    navigateToBookDetail,
    navigateToBookList,
    navigateToPage,
  };
};
