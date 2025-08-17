'use client';

import styles from './SearchBookSection.module.scss';
import { InputForm } from '../../../../components/input-form/InputForm';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const SearchBookSection = () => {
  const t = useTranslations('SearchBookSection');
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const segments = pathname?.split('/').filter(Boolean);
  const locale = segments?.[0] ?? 'en';
  const page = '1';

  const currentSearch = searchParams?.get('searchTerm') ?? '';

  const [localValue, setLocalValue] = useState(currentSearch);

  useEffect(() => {
    setLocalValue(currentSearch);
  }, [currentSearch]);

  const handleSubmitBookSearch = () => {
    const detailsId = segments?.[2];
    const newPath = `/${locale}/${page}${detailsId ? `/${detailsId}` : ''}`;

    const query = localValue
      ? `?searchTerm=${encodeURIComponent(localValue)}`
      : '';

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
