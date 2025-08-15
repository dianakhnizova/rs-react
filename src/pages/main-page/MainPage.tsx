'use client';

import styles from './MainPage.module.scss';
import { SearchBookSection } from './components/search-book-section/SearchBookSection';
import { BooksSection } from './components/books-section/BooksSection';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';

export const MainPage = () => {
  return (
    <main className={styles.container}>
      <SearchBookSection />

      <section className={styles.content}>
        <BooksSection />
      </section>

      <RefreshButton />
    </main>
  );
};
