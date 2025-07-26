import { useState } from 'react';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { BooksSection } from './components/books-section/BooksSection';
import { Popup } from '@/components/popup/Popup';
import { Spinner } from '@/components/spinner/Spinner';
import { LocalStorage } from '@/sources/enums';
import { BooksList } from './components/books-section/components/books-list/BooksList';
import { Button } from '@/components/button/Button';
import { messages } from './messages';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { PagePath } from '@/router/enums';

export const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    (localStorage.getItem(LocalStorage.SEARCH_KEY) || '').trim()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { id } = useParams();

  const navigate = useNavigate();

  const isDetailPage = !!id;

  const handleSearchQuery = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setErrorMessage('');
    localStorage.setItem(LocalStorage.SEARCH_KEY, searchTerm.trim());
  };

  const onClose = () => {
    setErrorMessage('');
  };

  const navigateToAboutPage = () => {
    void navigate(PagePath.aboutPage);
  };

  return (
    <main data-testid="main-page" className={styles.container}>
      <Popup
        isOpen={isLoading || !!errorMessage}
        onClose={onClose}
        data-testid="popup"
        isLoading={isLoading}
      >
        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : (
          <Spinner isLoading={isLoading} />
        )}
      </Popup>

      <SearchSection onSearch={handleSearchQuery} searchTerm={searchTerm} />

      <div className={styles.content}>
        <BooksSection>
          <BooksList
            setLoading={setIsLoading}
            searchTerm={searchTerm}
            onClose={onClose}
            isLoading={isLoading}
            setError={setErrorMessage}
          />
        </BooksSection>

        {isDetailPage && (
          <div className={styles.productDetailsContainer}>
            <Outlet />
          </div>
        )}
      </div>

      <Button onClick={navigateToAboutPage}>
        {messages.toAboutPageButton}
      </Button>
    </main>
  );
};
