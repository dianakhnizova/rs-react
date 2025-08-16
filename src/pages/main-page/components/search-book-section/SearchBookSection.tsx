'use client';

import styles from './SearchBookSection.module.scss';
import { InputForm } from '../../../../components/input-form/InputForm';
import { messages } from './messages';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const SearchBookSection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSearch = searchParams?.get('searchTerm') ?? '';
  const currentDetailsId = pathname?.split('/')[2] ?? '';

  const router = useRouter();

  const [localValue, setLocalValue] = useState(currentSearch);

  useEffect(() => {
    setLocalValue(currentSearch);
  }, [currentSearch]);

  const handleSubmitBookSearch = () => {
    let newPath = '/1';
    if (currentDetailsId) {
      newPath += `/${currentDetailsId}`;
    }
    const query = localValue
      ? `?searchTerm=${encodeURIComponent(localValue)}&page=1`
      : '?page=1';

    router.push(`${newPath}${query}`);
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
