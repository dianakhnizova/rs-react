import styles from './MainPage.module.scss';
import { SearchBookSection } from './components/search-book-section/SearchBookSection';
import { BooksSection } from './components/books-section/BooksSection';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';
import { IBookData } from '@/sources/interfaces';

interface Props {
  initialBooks: IBookData[];
  initialTotalItems: number;
}

export const MainPage = ({ initialBooks, initialTotalItems }: Props) => {
  return (
    <main className={styles.container}>
      <SearchBookSection />

      <section className={styles.content}>
        <BooksSection
          initialBooks={initialBooks}
          initialTotalItems={initialTotalItems}
        />
      </section>

      <RefreshButton />
    </main>
  );
};
