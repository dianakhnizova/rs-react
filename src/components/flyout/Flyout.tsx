import styles from './Flyout.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { BookCard } from '../books-cards/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import { downloadBooksCsv } from '@/utils/downloadBooksCsv';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectCart, selectItemIsInCart } from '@/store/slices/cart/selectors';

export const Flyout = () => {
  const cart = useSelector(selectCart);
  const { clearCart } = useActions();
  const itemIsInCart = useSelector(selectItemIsInCart);

  const handleUnselectAllButton = () => {
    clearCart();
  };

  const handleDownloadButton = () => {
    downloadBooksCsv(cart);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.flyout]: itemIsInCart,
      })}
    >
      <div className={styles.content}>
        {itemIsInCart ? (
          <>
            <p>
              {cart.length}
              {messages.titleItemsPerCart}
            </p>

            <div className={styles.itemContainer}>
              {cart.map(book => (
                <BookCard key={book.id} book={book} isFlyout={itemIsInCart} />
              ))}
            </div>
          </>
        ) : (
          <p>{messages.titleEmpty}</p>
        )}
      </div>

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
