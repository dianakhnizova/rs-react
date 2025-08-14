'use client';

import { useEffect } from 'react';
import { useActions } from './useActions';
import { PagePath } from '@/router/enums';
import { useRouter, useParams } from 'next/navigation';

export const useIsValidPage = () => {
  const router = useRouter();
  const params = useParams();
  const pageParam = params?.page;
  const { setCurrentPage } = useActions();

  const isValidPage =
    !pageParam ||
    (pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1);

  useEffect(() => {
    if (isValidPage) {
      const pageNum = pageParam ? Math.max(1, Number(pageParam)) : 1;
      setCurrentPage(pageNum);
    } else {
      void router.push(PagePath.notFound);
    }
  }, [pageParam, isValidPage, router, setCurrentPage]);

  return isValidPage;
};
