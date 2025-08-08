import { useNavigate, useParams } from 'react-router-dom';
import { PagePath } from '@/router/enums';
import { useCallback, useEffect } from 'react';
import { useAppSelector } from './useAppSelector';
import { selectPagination } from '@/store/slices/pagination/selectors';
import { useActions } from './useActions';

export const useNavigationToPath = () => {
  const { detailsId } = useParams();
  const navigate = useNavigate();
  const { page: pageParam } = useParams();
  const { currentPage } = useAppSelector(selectPagination);
  const { setCurrentPage } = useActions();

  const isValidPage =
    !pageParam ||
    (pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1);

  useEffect(() => {
    if (isValidPage) {
      const pageNum = pageParam ? Math.max(1, Number(pageParam)) : 1;
      setCurrentPage(pageNum);
    } else {
      redirectToNotFound();
    }
  }, [pageParam, isValidPage]);

  const redirectToNotFound = useCallback(() => {
    void navigate(PagePath.notFound, { replace: true });
  }, [navigate]);

  const navigateToBookDetail = useCallback(
    (bookId: string) => {
      void navigate(`/${currentPage}/${bookId}`);
    },
    [navigate, currentPage]
  );

  const navigateToBookList = useCallback(
    (page: number) => {
      void navigate(`/${page}`);
    },
    [navigate]
  );

  const navigateToPage = useCallback(
    (page: number) => {
      void navigate(detailsId ? `/${page}/${detailsId}` : `/${page}`);
    },
    [navigate, detailsId]
  );

  const navigateToAboutPage = useCallback(() => {
    void navigate(PagePath.aboutPage);
  }, [navigate]);

  return {
    currentPage,
    isValidPage,
    redirectToNotFound,
    navigateToBookDetail,
    navigateToAboutPage,
    navigateToBookList,
    navigateToPage,
  };
};
