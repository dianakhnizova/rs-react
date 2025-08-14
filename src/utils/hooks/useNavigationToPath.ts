'use client';

import { PagePath } from '@/router/enums';
import { useCallback } from 'react';
import { useAppSelector } from './useAppSelector';
import { selectCurrentPage } from '@/store/slices/pagination/selectors';
import { useIsValidPage } from './useIsValidPage';
import { useParams, useRouter } from 'next/navigation';

export const useNavigationToPath = () => {
  const router = useRouter();
  const params = useParams<{ detailsId?: string }>();
  const detailsId = params?.detailsId;

  const currentPage = useAppSelector(selectCurrentPage);
  const isValidPage = useIsValidPage();

  const navigateToBookDetail = useCallback(
    (bookId: string) =>
      isValidPage ? `/${currentPage}/${bookId}` : PagePath.notFound,
    [currentPage, isValidPage]
  );

  const navigateToBookList = useCallback(
    (page: number) => {
      if (isValidPage) void router.push(`/${page}`);
    },
    [router, isValidPage]
  );

  const navigateToPage = useCallback(
    (page: number) => {
      if (isValidPage)
        router.push(detailsId ? `/${page}/${detailsId}` : `/${page}`);
    },
    [router, detailsId, isValidPage]
  );

  return {
    currentPage,
    navigateToBookDetail,
    navigateToBookList,
    navigateToPage,
  };
};
