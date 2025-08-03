import styles from './Flyout.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { BookCard } from '../books-cards/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import classNames from 'classnames';
import { selectCart, selectItemIsInCart } from '@/store/slices/cart/selectors';
import { Slider } from '../slider/Slider';
import { ITEMS_PER_FLYOUT } from '@/sources/constants';
import { DownloadBooksButton } from '../download-books-button/DownloadBooksButton';
import { useAppSelector } from '@/utils/hooks/useAppSelector';

export const Flyout = () => {
  const cart = useAppSelector(selectCart);
  const { clearCart } = useActions();
  const itemIsInCart = useAppSelector(selectItemIsInCart);

  const handleUnselectAllButton = () => {
    clearCart();
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

            {cart.length > ITEMS_PER_FLYOUT ? (
              <Slider books={cart}>
                {demonstrationBooks =>
                  demonstrationBooks.map(book => (
                    <BookCard key={book.id} book={book} isFlyout />
                  ))
                }
              </Slider>
            ) : (
              <div className={styles.itemContainer}>
                {cart.map(book => (
                  <BookCard key={book.id} book={book} isFlyout />
                ))}
              </div>
            )}
          </>
        ) : (
          <p>{messages.titleEmpty}</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleUnselectAllButton}>
          {messages.titleUnselectAllButton}
        </Button>

        <DownloadBooksButton />
      </div>
    </div>
  );
};
