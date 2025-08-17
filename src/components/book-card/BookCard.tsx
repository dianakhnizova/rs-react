'use client';

import styles from './BookCard.module.scss';
import { BookDetail, IBookData } from '@/sources/interfaces';
import classNames from 'classnames';
import { Checkbox } from '../checkbox/Checkbox';
import { useActions } from '@/utils/hooks/useActions';
import { Button } from '../button/Button';
import { FC, useState } from 'react';
import { selectSelectedBook } from '@/store/slices/cart/selectors';
import { ButtonVariant } from '../button/enum';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { CoverImage } from '../cover-image/CoverImage';
import { BookCardWrapper } from './book-card-wrapper/BookCardWrapper';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  RemoveDarkTheme,
  RemoveHoverTheme,
  RemoveLightTheme,
} from './constants';

interface Props {
  book: IBookData;
  details?: BookDetail[];
  to?: string;
  isSelected?: boolean;
  isDetails?: boolean;
  isFlyout?: boolean;
}

export const BookCard: FC<Props> = ({
  book,
  details,
  to,
  isSelected,
  isDetails,
  isFlyout,
}) => {
  const t = useTranslations('BookCard');
  const a = useTranslations('Alt');

  const { title, id } = book;
  const selectedBook = useAppSelector(selectSelectedBook(book.id));
  const { addItem, removeItem } = useActions();
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const iconRemoveSrc = hovered
    ? RemoveHoverTheme
    : theme === Theme.DARK
      ? RemoveDarkTheme
      : RemoveLightTheme;

  const toggleCheckbox = () => {
    if (!selectedBook) {
      addItem(book);
    } else {
      removeItem({ id });
    }
  };

  const handleRemoveItem = () => {
    removeItem({ id });
  };

  return (
    <li
      className={classNames(styles.book, {
        [styles.bookInDetails]: isDetails,
        [styles.bookInFlyout]: isFlyout,
      })}
    >
      <BookCardWrapper to={to}>
        <div className={styles.container}>
          <div className={styles.title}>
            <p className={styles.titleName}>{title}</p>
          </div>

          <CoverImage
            src={book.image}
            alt={book.title}
            className={styles.image}
          />
        </div>

        {details &&
          details.map(({ value, className }, index) => {
            if (!value) return null;
            return (
              <div key={index} className={className}>
                <p>{value}</p>
              </div>
            );
          })}

        {isSelected && (
          <Checkbox
            label={!selectedBook ? t('titleSelect') : t('titleSelected')}
            checked={selectedBook}
            onChange={toggleCheckbox}
          />
        )}

        {isFlyout && (
          <Button
            onClick={handleRemoveItem}
            variant={ButtonVariant.SECONDARY}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Image
              src={iconRemoveSrc}
              alt={a('removeTitle')}
              width={16}
              height={16}
            />
          </Button>
        )}
      </BookCardWrapper>
    </li>
  );
};
