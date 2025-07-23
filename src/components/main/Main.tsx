import { useState } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ProductsSection } from './components/products-section/ProductsSection';
import { Popup } from '../popup/Popup';
import { Spinner } from '../spinner/Spinner';
import { LocalStorage } from '@/sources/enums';
import { BooksList } from './components/products-section/components/books-list/BooksList';
import { AboutPage } from '@/pages/about-page/AboutPage';

export const Main = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    (localStorage.getItem(LocalStorage.SEARCH_KEY) || '').trim()
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearchQuery = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setErrorMessage('');
    localStorage.setItem(LocalStorage.SEARCH_KEY, searchTerm.trim());
  };

  const onClose = () => {
    setErrorMessage('');
  };

  return (
    <main className={styles.container}>
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

      <ProductsSection>
        <BooksList
          setLoading={setIsLoading}
          searchTerm={searchTerm}
          onClose={onClose}
          isLoading={isLoading}
          setError={setErrorMessage}
        />
      </ProductsSection>
      <AboutPage />
    </main>
  );
};
