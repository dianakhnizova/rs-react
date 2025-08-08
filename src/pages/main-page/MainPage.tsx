import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Outlet } from 'react-router-dom';
import { Flyout } from '@/components/flyout/Flyout';
import { RefreshButton } from '@/components/refresh-button/RefreshButton';

export const MainPage = () => {
  return (
    <main data-testid="main-page" className={styles.container}>
      <SearchSection />

      <div className={styles.content}>
        <BooksSection />

        <Outlet />
      </div>

      <RefreshButton />

      <Flyout />
    </main>
  );
};
