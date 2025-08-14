'use client';

import { useEffect } from 'react';
import { PagePath } from '@/router/enums';
import { useRouter, useParams } from 'next/navigation';

export const useIsValidPage = () => {
  const router = useRouter();
  const params = useParams();
  const pageParam = params?.page;

  const isValidPage =
    !pageParam ||
    (pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1);

  useEffect(() => {
    if (!isValidPage) {
      void router.push(PagePath.notFound);
    }
  }, [isValidPage, router]);

  return isValidPage;
};
