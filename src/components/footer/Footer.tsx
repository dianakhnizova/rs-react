import { useTranslations } from 'next-intl';
import styles from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <footer className={styles.container}>
      <p>{t('title')}</p>
    </footer>
  );
};
