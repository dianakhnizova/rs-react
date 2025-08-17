'use client';

import styles from './SearchBookSection.module.scss';
import { InputForm } from '../../../../components/input-form/InputForm';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const SearchBookSection = () => {
  const t = useTranslations('SearchBookSection');

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
        placeholder: t('search'),
        value: localValue,
        className: styles.input,
      }}
      buttonLabel={t('search')}
      isShowButton
    />
  );
};
