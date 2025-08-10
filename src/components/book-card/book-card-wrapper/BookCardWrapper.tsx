import styles from './BookCardWrapper.module.scss';
import { Link } from 'react-router-dom';

interface Props {
  to?: string;
  children: React.ReactNode;
}

export const BookCardWrapper = ({ to, children }: Props) => {
  return to ? (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};
