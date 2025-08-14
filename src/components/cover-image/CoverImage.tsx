'use client';

import { useState } from 'react';
import Image from 'next/image';

import styles from './CoverImage.module.scss';
import classNames from 'classnames';

interface Props {
  src: string;
  alt: string;
  className: string;
}

const BookPlaceholder = '/img-placeholder.jpg';
const CoverSpinnerPlaceholder = '/cover-spinner.gif';

export const CoverImage = ({ src, alt, className }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(!!src);

  return (
    <div className={classNames(styles.container, className)}>
      <Image
        src={isImageLoading ? CoverSpinnerPlaceholder : src || BookPlaceholder}
        alt={alt}
        width={100}
        height={100}
        onLoad={() => setIsImageLoading(false)}
        onError={() => setIsImageLoading(false)}
        priority
      />
    </div>
  );
};
