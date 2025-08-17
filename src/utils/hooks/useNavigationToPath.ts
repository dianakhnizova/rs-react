'use client';

import { useCallback } from 'react';
import { useIsValidPage } from './useIsValidPage';
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { PagePath } from '@/sources/enums';

export const useNavigationToPath = () => {
  const params = useParams<{ page: string; id: string; detailsId?: string }>();
  const currentPage = params?.page ?? '1';
  const detailsId = params?.detailsId;

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams?.get('searchTerm');

  const isValidPage = useIsValidPage();

  const navigateToBookDetail = useCallback(
    (bookId: string) => {
      if (!isValidPage) return notFound();

      let url = `/${currentPage}/${bookId}`;
      if (currentSearch) {
        url += `?searchTerm=${encodeURIComponent(currentSearch)}`;
      }

      return url;
    },
    [currentPage, currentSearch, isValidPage]
  );

  const navigateToBookList = useCallback(() => {
    let url = `/${currentPage}`;
    if (currentSearch) {
      url += `?searchTerm=${encodeURIComponent(currentSearch)}`;
    }
    return url;
  }, [currentPage, currentSearch]);

  const navigateToPage = useCallback(
    (page: number, searchTerm?: string) => {
      let url = detailsId ? `/${page}/${detailsId}` : `/${page}`;
      if (searchTerm) {
        url += `?searchTerm=${encodeURIComponent(searchTerm)}`;
      }
      if (isValidPage) void router.push(url);
    },
    [router, detailsId, isValidPage]
  );

  const navigateToMain = () => {
    void router.push(PagePath.root);
  };

  return {
    navigateToBookDetail,
    navigateToBookList,
    navigateToPage,
    navigateToMain,
  };
};
