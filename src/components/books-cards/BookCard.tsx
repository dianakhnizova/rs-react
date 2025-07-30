import styles from './BookCard.module.scss';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { BookDetail, IBookData } from '@/sources/interfaces';
import classNames from 'classnames';
import { messages } from './messages';
import { Checkbox } from '../checkbox/Checkbox';
import { useActions } from '@/utils/hooks/useActions';
import { useTypedSelector } from '@/utils/hooks/useTypedSelector';
import { Button } from '../button/Button';
import { FC } from 'react';

interface Props {
  book: IBookData;
  details?: BookDetail[];
  onClick?: () => void;
  isSelected?: boolean;
  isCart?: boolean;
}

export const BookCard: FC<Props> = ({
  book,
  details,
  onClick,
  isSelected,
  isCart,
}: Props) => {
  const { title, image, id, bookDetails } = book;
  const { addItem, removeItem, setIsSelectItem } = useActions();
  const cart = useTypedSelector(state => state.cart);

  const isExistsInCart = cart.some(bookSelected => bookSelected.id === id);

  const toggleCheckbox = () => {
    if (!isExistsInCart) {
      addItem(book);
      setIsSelectItem(true);
    } else {
      removeItem({ id: book.id });

      if (cart.length === 1) {
        setIsSelectItem(false);
      }
    }
  };

  const handleRemoveItem = () => {
    if (isExistsInCart) {
      removeItem({ id: book.id });

      if (cart.length === 1) {
        setIsSelectItem(false);
      }
    }
  };

  return (
    <li
      onClick={onClick}
      className={classNames(styles.book, {
        [styles.clickable]: !!onClick,
        [styles.bookInCart]: isCart,
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

      {bookDetails &&
        details &&
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
          label={
            !isExistsInCart ? messages.titleSelect : messages.titleSelected
          }
          checked={isExistsInCart}
          onChange={toggleCheckbox}
        />
      )}

      {isCart && (
        <Button
          onClick={handleRemoveItem}
          className={styles.removeButton}
        ></Button>
      )}
    </li>
  );
};
