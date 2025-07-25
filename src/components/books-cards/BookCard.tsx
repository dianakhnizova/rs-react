import { NavLink } from 'react-router-dom';
import styles from './BookCard.module.scss';
import { messages } from './messages';
import BookPlaceholder from '@/assets/img-placeholder.jpg';

interface Props {
  id: string;
  title?: string;
  description?: string;
  image?: string;
}

export const BookCard = ({ id, title, description, image }: Props) => {
  return (
    <li className={styles.book}>
      <div className={styles.title}>
        <NavLink to={id}>{title}</NavLink>
      </div>

      <div className={styles.description}>
        <p>{description || messages.titleNotDescription}</p>
      </div>

      <div className={styles.image}>
        <img
          src={image || BookPlaceholder}
          alt={title}
          className={styles.img}
        />
      </div>
    </li>
  );
};
