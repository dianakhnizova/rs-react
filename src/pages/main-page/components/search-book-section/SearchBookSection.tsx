'use client';

import styles from './SearchBookSection.module.scss';
import { InputForm } from '../../../../components/input-form/InputForm';
import { messages } from './messages';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SearchBookSection = () => {
  const searchParams = useSearchParams();

  const currentSearch = searchParams?.get('searchTerm') ?? '';
  const router = useRouter();

  const [localValue, setLocalValue] = useState(currentSearch);

  useEffect(() => {
    setLocalValue(currentSearch);
  }, [currentSearch]);

  const handleSubmitBookSearch = () => {
    router.push(`/?searchTerm=${encodeURIComponent(localValue)}&page=1`);
  };

  return (
    <InputForm
      setSearchInput={setLocalValue}
      onFormSubmitHandler={handleSubmitBookSearch}
      inputProps={{
        type: 'text',
        placeholder: messages.inputPlaceholder,
        value: localValue,
        className: styles.input,
      }}
      buttonLabel={messages.searchButton}
      isShowButton
    />
  );
};
