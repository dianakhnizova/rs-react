import { NavLink } from 'react-router-dom';
import styles from './BookCard.module.scss';
import { messages } from './messages';
import BookPlaceholder from '@/assets/img-placeholder.jpg';

interface Props {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  pageCount?: number | string;
  printType?: string;
}

export const BookCard = ({
  id,
  title,
  description,
  image,
  author,
  pageCount,
  printType,
}: Props) => {
  return (
    <li className={styles.book}>
      {title && (
        <div className={styles.title}>
          <NavLink className={styles.titleName} to={id}>
            {title}
          </NavLink>
        </div>
      )}

      {description && (
        <div className={styles.description}>
          <p>{description || messages.titleNotDescription}</p>
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

      {author && (
        <div className={styles.author}>
          <p>{author || messages.titleNotAuthor}</p>
        </div>
      )}

      {pageCount && (
        <div className={styles.pageCount}>
          <p>{pageCount || messages.titleNotPageCount}</p>
        </div>
      )}

      {printType && (
        <div className={styles.printType}>
          <p>{printType || messages.titleNotPrintType}</p>
        </div>
      )}
    </li>
  );
};
