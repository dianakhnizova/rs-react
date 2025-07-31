import styles from './CartDropdown.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { useTypedSelector } from '@/utils/hooks/useTypedSelector';
import { BookCard } from '../books-cards/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import { downloadBooksCsv } from '@/utils/downloadBooksCsv';
import classNames from 'classnames';

export const CartDropdown = () => {
  const cart = useTypedSelector(state => state.cart.cart);
  const { isCart } = useTypedSelector(state => state.isCart);
  const { isSelectItem } = useTypedSelector(state => state.selectItem);
  const { clearCart, setIsSelectItem } = useActions();

  const handleUnselectAllButton = () => {
    clearCart();
    setIsSelectItem(false);
  };

  const handleDownloadButton = () => {
    downloadBooksCsv(cart);
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.dropDown]: isSelectItem,
      })}
    >
      <div className={styles.content}>
        {cart.length > 0 ? (
          <>
            <p>
              {cart.length}
              {messages.titleItemsPerCart}
            </p>

            <div className={styles.itemContainer}>
              {cart.map(book => (
                <BookCard key={book.id} book={book} isCart={isCart} />
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
