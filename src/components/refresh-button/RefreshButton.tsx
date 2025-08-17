'use client';

import { useTranslations } from 'next-intl';
import { Button } from '../button/Button';

const handleRefreshButton = () => {
  console.log('Refresh');
};

export const RefreshButton = () => {
  const t = useTranslations('Refresh');

  return <Button onClick={handleRefreshButton}>{t('refresh')}</Button>;
};
