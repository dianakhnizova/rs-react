import styles from './BookCard.module.scss';
import { BookDetail, IBookData } from '@/sources/interfaces';
import classNames from 'classnames';
import { messages } from './messages';
import { Checkbox } from '../checkbox/Checkbox';
import { useActions } from '@/utils/hooks/useActions';
import { Button } from '../button/Button';
import { FC } from 'react';
import { selectSelectedBook } from '@/store/slices/cart/selectors';
import { ButtonVariant } from '../button/enum';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { CoverImage } from '../cover-image/CoverImage';
import { Link } from 'react-router-dom';

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
  const { title, id } = book;
  const selectedBook = useAppSelector(selectSelectedBook(book.id));
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
      className={classNames(styles.book, {
        [styles.bookInDetails]: isDetails,
        [styles.bookInFlyout]: isFlyout,
      })}
    >
      {to ? (
        <Link to={to} className={styles.link}>
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
        </Link>
      ) : (
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
      )}

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
        />
      )}
    </li>
  );
};
