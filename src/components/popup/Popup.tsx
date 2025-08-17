'use client';

import type { ReactNode } from 'react';
import styles from './Popup.module.scss';
import { Button } from '../button/Button';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  isError?: boolean;
  error?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export const Popup = ({ isOpen, isError, error, onClose, children }: Props) => {
  const t = useTranslations('Popup');

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.container}>
        {isError ? <p className={styles.error}>{error}</p> : children}

        {onClose && <Button onClick={onClose}>{t('close')}</Button>}
      </div>
    </>
  );
};
