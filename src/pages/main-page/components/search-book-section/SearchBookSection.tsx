'use client';

import styles from './SearchBookSection.module.scss';
import { useActions } from '@/utils/hooks/useActions';
import { InputForm } from '../../../../components/input-form/InputForm';
import { messages } from './messages';
import { useSearchQuery } from '@/utils/hooks/useSearchQuery';

export const SearchBookSection = () => {
  const { searchInput, setSearchInput } = useSearchQuery();
  const { setSearchTerm, setCurrentPage } = useActions();

  const handleSubmitBookSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  return (
    <InputForm
      setSearchInput={setSearchInput}
      onFormSubmitHandler={handleSubmitBookSearch}
      inputProps={{
        type: 'text',
        placeholder: messages.inputPlaceholder,
        value: searchInput,
        className: styles.input,
      }}
      buttonLabel={messages.searchButton}
      isShowButton
    />
  );
};
