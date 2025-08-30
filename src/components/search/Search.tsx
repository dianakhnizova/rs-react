import { InputType } from '@/sources/enums';
import { Input } from '../input/Input';
import { messages } from '@/sources/messages';
import styles from './Search.module.scss';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';
import { useActions } from '@/utils/hooks/useActions';

export const Search = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const { setSearchTerm } = useActions();
  const [searchInput, setSearchInput] = useState(searchTerm);

  const handleSearchClick = useCallback(() => {
    setSearchTerm(searchInput);
  }, [searchInput, setSearchTerm]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      handleSearchClick();
    },
    [handleSearchClick]
  );

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <Input
          id={InputType.TEXT}
          type={InputType.TEXT}
          placeholder={messages.button.search}
          setInput={setSearchInput}
          isSearch
        />
      </form>
    </div>
  );
};
