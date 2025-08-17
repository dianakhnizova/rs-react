import styles from './PageLayout.module.scss';
import { MainPage } from '@/pages/main-page/MainPage';
import { fetchBooksData } from '@/app/api/books/fetchBooksData';
import { ITEMS_PER_PAGE } from '@/sources/constants';
import { IBookData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';

interface Props {
  children: React.ReactNode;
  params: Promise<{ page: string }>;
  searchParams?: { searchTerm?: string };
}

const LocaleLayout = async ({ children, params, searchParams }: Props) => {
  const { page } = await params;
  const searchTerm = searchParams?.searchTerm ?? '';

  let booksList: IBookData[] = [];
  let totalItems = 0;
  let errorMessage: string | null = null;

  try {
    const result = await fetchBooksData(
      searchTerm,
      Number(page ?? '1'),
      ITEMS_PER_PAGE
    );
    booksList = result.booksList;
    totalItems = result.totalItems;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : messages.errorMessage;
  }

  return (
    <div className={styles.container}>
      <MainPage
        initialBooks={booksList}
        initialTotalItems={totalItems}
        initialError={errorMessage}
      />

      {children}
    </div>
  );
};

export default LocaleLayout;
