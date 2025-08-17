import styles from './BookCardWrapper.module.scss';
import { createNavigation } from 'next-intl/navigation';

interface Props {
  to?: string;
  children: React.ReactNode;
}

export const BookCardWrapper = ({ to, children }: Props) => {
  const { Link } = createNavigation();

  return to ? (
    <Link href={to} className={styles.link}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};
