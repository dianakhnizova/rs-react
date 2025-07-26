import styles from './BookCard.module.scss';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { BookDetail } from '@/sources/interfaces';

interface Props {
  title?: string;
  image?: string;
  details?: BookDetail[];
  onClick?: () => void;
}

export const BookCard = ({ title, image, details, onClick }: Props) => {
  return (
    <li onClick={onClick} className={styles.book}>
      {title && (
        <div className={styles.title}>
          <p className={styles.titleName}>{title}</p>
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
