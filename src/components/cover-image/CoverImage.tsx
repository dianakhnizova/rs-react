import { useState } from 'react';
import styles from './CoverImage.module.scss';
import { IBookData } from '@/sources/interfaces';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import CoverSpinnerPlaceholder from '@/assets/cover-spinner.gif';

interface Props {
  book: IBookData;
}

export const CoverImage = ({ book }: Props) => {
  const { title, image } = book;

  const [isImageLoading, setIsImageLoading] = useState(!!image);

  return (
    <div className={styles.container}>
      <img
        src={
          isImageLoading ? CoverSpinnerPlaceholder : image || BookPlaceholder
        }
        alt={title}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />
    </div>
  );
};
