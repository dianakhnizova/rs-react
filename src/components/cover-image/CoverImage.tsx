import { useState } from 'react';
import styles from './CoverImage.module.scss';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import CoverSpinnerPlaceholder from '@/assets/cover-spinner.gif';
import classNames from 'classnames';

interface Props {
  src: string;
  alt: string;
  className: string;
}

export const CoverImage = ({ src, alt, className }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(!!src);

  return (
    <div className={classNames(styles.container, className)}>
      <img
        src={isImageLoading ? CoverSpinnerPlaceholder : src || BookPlaceholder}
        alt={alt}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
      />
    </div>
  );
};
