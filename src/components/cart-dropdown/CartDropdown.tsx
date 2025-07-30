import styles from './CartDropdown.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { useTypedSelector } from '@/utils/hooks/useTypedSelector';
import { BookCard } from '../books-cards/BookCard';

export const CartDropdown = () => {
  const cart = useTypedSelector(state => state.cart);
  const { isCart } = useTypedSelector(state => state.isCart);

  return (
    <div className={styles.container}>
      {cart.length > 0 ? (
        <div className={styles.itemContainer}>
          {cart.map(book => (
            <BookCard key={book.id} book={book} isCart={isCart} />
          ))}
        </div>
      ) : (
        <div>
          <p>{messages.titleEmpty}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <Button>{messages.titleUnselectAllButton}</Button>
        <Button>{messages.titleDownloadButton}</Button>
      </div>
    </div>
  );
};
