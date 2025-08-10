import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActions } from './useActions';
import { PagePath } from '@/router/enums';

export const useIsValidPage = () => {
  const { page: pageParam } = useParams();
  const { setCurrentPage } = useActions();
  const navigate = useNavigate();

  const isValidPage =
    !pageParam ||
    (pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1);

  useEffect(() => {
    if (isValidPage) {
      const pageNum = pageParam ? Math.max(1, Number(pageParam)) : 1;
      setCurrentPage(pageNum);
    } else {
      void navigate(PagePath.notFound, { replace: true });
    }
  }, [pageParam, isValidPage, navigate]);

  return isValidPage;
};
