import { useState } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ProductsSection } from './components/products-section/ProductsSection';
import { Popup } from '../popup/Popup';
import { Spinner } from '../spinner/Spinner';
import { messages } from './messages';
import { Button } from '../button/Button';

export const Main = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchInput') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSimulateError, setIsSimulateError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSearchQuery = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setErrorMessage('');
    setIsSimulateError(false);
    localStorage.setItem('searchInput', searchTerm.trim());
  };

  const onClose = () => {
    setIsLoading(false);
    setErrorMessage('');
    setIsSimulateError(false);
  };

  const errorClick = () => {
    setIsSimulateError(true);
  };

  if (isSimulateError) {
    throw new Error('Test render error');
  }

  return (
    <main className={styles.container}>
      <Popup
        isOpen={isLoading || !!errorMessage}
        onClose={onClose}
        data-testid="popup"
      >
        {errorMessage ? (
          <p className={styles.error}>{errorMessage}</p>
        ) : (
          <Spinner isLoading={isLoading} />
        )}
      </Popup>

      <SearchSection onSearch={handleSearchQuery} />

      <ProductsSection
        setLoading={setIsLoading}
        searchTerm={searchTerm}
        onClose={onClose}
        isLoading={isLoading}
        setError={setErrorMessage}
      />

      <Button onClick={errorClick} className={styles.button}>
        {messages.errorButton}
      </Button>
    </main>
  );
};
