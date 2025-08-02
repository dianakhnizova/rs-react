import styles from './Flyout.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';
import { BookCard } from '../books-cards/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import { downloadBooksCsv } from '@/utils/downloadBooksCsv';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectCart, selectItemIsInCart } from '@/store/slices/cart/selectors';
import { Slider } from '../slider/Slider';
import { useEffect, useState } from 'react';
import { ITEMS_PER_FLYOUT } from '@/sources/constants';

export const Flyout = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  const cart = useSelector(selectCart);
  const { clearCart } = useActions();
  const itemIsInCart = useSelector(selectItemIsInCart);

  const totalSlides = Math.ceil(cart.length / ITEMS_PER_FLYOUT);

  const handleSlideChange = (page: number) => {
    setCurrentSlide(page);
  };

  const demonstrationBooks = cart.slice(
    (currentSlide - 1) * ITEMS_PER_FLYOUT,
    currentSlide * ITEMS_PER_FLYOUT
  );

  const handleUnselectAllButton = () => {
    clearCart();
  };

  const handleDownloadButton = () => {
    downloadBooksCsv(cart);
  };

  useEffect(() => {
    if (currentSlide > totalSlides) {
      setCurrentSlide(totalSlides === 0 ? 1 : totalSlides);
    }
  }, [cart.length, totalSlides, currentSlide]);

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

            {cart.length > 3 ? (
              <Slider
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                onSlideChange={handleSlideChange}
              >
                {demonstrationBooks.map(book => (
                  <BookCard key={book.id} book={book} isFlyout={itemIsInCart} />
                ))}
              </Slider>
            ) : (
              <div className={styles.itemContainer}>
                {cart.map(book => (
                  <BookCard key={book.id} book={book} isFlyout={itemIsInCart} />
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

        <Button onClick={handleDownloadButton}>
          {messages.titleDownloadButton}
        </Button>
      </div>
    </div>
  );
};
