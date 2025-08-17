'use client';

import { useCallback } from 'react';
import { useIsValidPage } from './useIsValidPage';
import {
  notFound,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

export const useNavigationToPath = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();

  const searchParams = useSearchParams();
  const segments = pathname?.split('/').filter(Boolean);

  const currentPage = segments?.[1] ?? '1';
  const detailsId = segments?.[2];
  const currentSearch = searchParams?.get('searchTerm');

  const isValidPage = useIsValidPage();
  const locale = params?.locale ?? 'en';

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
      let url = detailsId
        ? `/${locale}/${page}/${detailsId}`
        : `/${locale}/${page}`;

      if (searchTerm) url += `?searchTerm=${encodeURIComponent(searchTerm)}`;

      if (isValidPage) void router.push(url);
    },
    [router, isValidPage, locale, detailsId]
  );

  return {
    navigateToBookDetail,
    navigateToBookList,
    navigateToPage,
  };
};
