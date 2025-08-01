import styles from './BookCard.module.scss';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { BookDetail, IBookData } from '@/sources/interfaces';
import classNames from 'classnames';
import { messages } from './messages';
import { Checkbox } from '../checkbox/Checkbox';
import { useActions } from '@/utils/hooks/useActions';
import { Button } from '../button/Button';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedBook } from '@/store/slices/cart/selectors';
import { ButtonVariant } from '../button/enum';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';

interface Props {
  book: IBookData;
  details?: BookDetail[];
  onClick?: () => void;
  isSelected?: boolean;
  isDetailes?: boolean;
  isFlyout?: boolean;
}

export const BookCard: FC<Props> = ({
  book,
  details,
  onClick,
  isSelected,
  isDetailes,
  isFlyout,
}: Props) => {
  const { title, image, id } = book;
  const selectedBook = useSelector(selectSelectedBook(book.id));
  const { addItem, removeItem } = useActions();
  const { theme } = useTheme();

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
      onClick={onClick}
      className={classNames(styles.book, {
        [styles.bookInDetails]: isDetailes,
        [styles.bookInFlyout]: isFlyout,
      })}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <p className={styles.titleName}>{title}</p>
        </div>

        <div className={styles.image}>
          <img
            src={image || BookPlaceholder}
            alt={title}
            className={styles.img}
          />
        </div>
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
          label={!selectedBook ? messages.titleSelect : messages.titleSelected}
          checked={selectedBook}
          onChange={toggleCheckbox}
        />
      )}

      {isFlyout && (
        <Button
          onClick={handleRemoveItem}
          variant={ButtonVariant.SECONDARY}
          className={classNames(styles.removeButton, {
            [styles.removeLightButton]: theme === Theme.LIGHT,
          })}
        ></Button>
      )}
    </li>
  );
};
