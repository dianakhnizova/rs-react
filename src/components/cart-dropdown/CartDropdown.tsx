import styles from './CartDropdown.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { useTypedSelector } from '@/utils/hooks/useTypedSelector';
import { BookCard } from '../books-cards/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import { downloadBooksCsv } from '@/utils/downloadBooksCsv';

export const CartDropdown = () => {
  const cart = useTypedSelector(state => state.cart);
  const { isCart } = useTypedSelector(state => state.isCart);
  const { clearCart } = useActions();

  const handleUnselectAllButton = () => {
    clearCart();
  };

  const handleDownloadButton = () => {
    downloadBooksCsv(cart);
  };

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
        <Button onClick={handleUnselectAllButton}>
          {messages.titleUnselectAllButton}
        </Button>

        <Button onClick={handleDownloadButton}>
          {messages.titleDownloadButton}
        </Button>
      </div>
    </div>
  );
};
