import { Component } from 'react';
import styles from './BookCard.module.scss';
import { messages } from './messages';
import BookPlaceholder from '@/assets/img-placeholder.jpg';

interface Props {
  name: string;
  description: string;
  image: string;
}

export class BookCard extends Component<Props> {
  public render() {
    const { name, description, image } = this.props;

    return (
      <>
        <div className={styles.book}>
          <div className={styles.name}>
            <p>{name}</p>
          </div>
          <div className={styles.description}>
            <p>{description || messages.titleNotDescription}</p>
          </div>
          <div className={styles.image}>
            <img
              src={image || BookPlaceholder}
              alt={name}
              className={styles.img}
            />
          </div>
        </div>
      </>
    );
  }
}
