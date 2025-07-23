import styles from './BookCard.module.scss';
import { messages } from './messages';
import BookPlaceholder from '@/assets/img-placeholder.jpg';

interface Props {
  name: string;
  description: string;
  image: string;
}

export const BookCard = ({ name, description, image }: Props) => {
  return (
    <li className={styles.book}>
      <div className={styles.name}>
        <p>{name}</p>
      </div>
      <div className={styles.description}>
        <p>{description || messages.titleNotDescription}</p>
      </div>
      <div className={styles.image}>
        <img src={image || BookPlaceholder} alt={name} className={styles.img} />
      </div>
    </li>
  );
};
