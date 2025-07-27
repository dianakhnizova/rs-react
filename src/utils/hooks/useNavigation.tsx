import { useNavigate, useParams } from 'react-router-dom';
import { PagePath } from '@/router/enums';
import { useCallback } from 'react';

export const useNavigation = () => {
  const navigate = useNavigate();
  const { page: pageParam, detailsId } = useParams();

  const isValidPage =
    pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1;
  const currentPage = isValidPage ? Math.max(1, Number(pageParam)) : 1;

  const redirectToNotFound = useCallback(() => {
    void navigate(PagePath.notFound, { replace: true });
  }, [navigate]);

  const navigateToBookDetail = useCallback(
    (bookId: string) => {
      void navigate(`/${currentPage}/${bookId}`);
    },
    [navigate, currentPage]
  );

  const navigateToAboutPage = useCallback(() => {
    void navigate(PagePath.aboutPage);
  }, [navigate]);

  const navigateOnSearch = useCallback(() => {
    const newUrl = detailsId ? `/1/${detailsId}` : '/1';
    void navigate(newUrl);
  }, [navigate, detailsId]);

  const navigateToPage = useCallback(
    (page: number) => {
      const newUrl = detailsId ? `/${page}/${detailsId}` : `/${page}`;
      void navigate(newUrl);
    },
    [navigate, detailsId]
  );

  return {
    currentPage,
    isValidPage,
    redirectToNotFound,
    navigateToBookDetail,
    navigateToAboutPage,
    navigateOnSearch,
    navigateToPage,
  };
};
