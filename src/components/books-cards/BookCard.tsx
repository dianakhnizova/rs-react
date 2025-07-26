import { NavLink } from 'react-router-dom';
import styles from './BookCard.module.scss';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { BookDetail } from '@/sources/interfaces';

interface Props {
  id: string;
  title?: string;
  image?: string;
  details?: BookDetail[];
}

export const BookCard = ({ id, title, image, details }: Props) => {
  return (
    <li className={styles.book}>
      {title && (
        <div className={styles.title}>
          <NavLink className={styles.titleName} to={id}>
            {title}
          </NavLink>
        </div>
      )}

      {image && (
        <div className={styles.image}>
          <img
            src={image || BookPlaceholder}
            alt={title}
            className={styles.img}
          />
        </div>
      )}

      {details &&
        details.map(({ value, className }, index) => {
          if (!value) return null;

          return (
            <div key={index} className={styles[className]}>
              <p>{value}</p>
            </div>
          );
        })}
    </li>
  );
};
