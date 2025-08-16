import styles from './MainPage.module.scss';
import { SearchBookSection } from './components/search-book-section/SearchBookSection';
import { BooksSection } from './components/books-section/BooksSection';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';
import { IBookData } from '@/sources/interfaces';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
  initialErrorMessage: string;
}

export const MainPage = ({
  initialBooks,
  initialTotalItems,
  initialErrorMessage,
}: Props) => {
  return (
    <main className={styles.container}>
      <SearchBookSection />

      <section className={styles.content}>
        <BooksSection
          initialBooks={initialBooks}
          initialTotalItems={initialTotalItems}
          initialErrorMessage={initialErrorMessage}
        />
      </section>

      <RefreshButton />
    </main>
  );
};
