import Link from 'next/link';
import styles from './BookCardWrapper.module.scss';

interface Props {
  to?: string;
  children: React.ReactNode;
}

export const BookCardWrapper = ({ to, children }: Props) => {
  return to ? (
    <Link href={to} className={styles.link}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};
