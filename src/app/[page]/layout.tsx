import styles from './PageLayout.module.scss';
import { MainPage } from '@/pages/main-page/MainPage';
import { fetchBooksData } from '../api/books/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';

interface Props {
  children: React.ReactNode;
  params: Promise<{ page: string }>;
  searchParams?: { searchTerm?: string };
}

const PageLayout = async ({ children, params, searchParams }: Props) => {
  const { page } = await params;
  const searchTerm = searchParams?.searchTerm ?? '';

  const { booksList, totalItems } = await fetchBooksData(
    searchTerm,
    Number(page ?? '1'),
    ITEMS_PER_PAGE
  );

  return (
    <div className={styles.container}>
      <MainPage initialBooks={booksList} initialTotalItems={totalItems} />

      {children}
    </div>
  );
};

export default PageLayout;
