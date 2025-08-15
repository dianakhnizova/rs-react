import { useParams } from 'next/navigation';

export const useIsValidPage = () => {
  const params = useParams();
  const pageParam = params?.page;

  const isValidPage =
    !pageParam ||
    (pageParam && !Number.isNaN(Number(pageParam)) && Number(pageParam) >= 1);

  return isValidPage;
};
