import styles from './MainPage.module.scss';
import { SearchBookSection } from './components/search-book-section/SearchBookSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Outlet } from 'react-router-dom';
import { Flyout } from '@/components/flyout/Flyout';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';

export const MainPage = () => {
  return (
    <main data-testid="main-page" className={styles.container}>
      <SearchBookSection />

      <section className={styles.content}>
        <BooksSection />
        <Outlet />
      </section>

      <RefreshButton />

      <Flyout />
    </main>
  );
};
