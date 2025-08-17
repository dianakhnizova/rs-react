'use client';

import styles from './Flyout.module.scss';
import { Button } from '../button/Button';
import { BookCard } from '../book-card/BookCard';
import { useActions } from '@/utils/hooks/useActions';
import classNames from 'classnames';
import { selectCart, selectItemIsInCart } from '@/store/slices/cart/selectors';
import { Slider } from '../slider/Slider';
import { ITEMS_PER_FLYOUT } from '@/sources/constants';
import { DownloadBooksButton } from '../download-books-button/DownloadBooksButton';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { DemonstrationBooks } from '../book-card/DemonstrationBooks';
import { useTranslations } from 'next-intl';

export const Flyout = () => {
  const t = useTranslations('Flyout');

  const cart = useAppSelector(selectCart);
  const { clearCart } = useActions();
  const itemIsInCart = useAppSelector(selectItemIsInCart);

  const cartLength = cart.length;

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
            <p className={styles.countTitle}>
              {cartLength}
              {cartLength > 1 ? t('titleItemsPerCart') : t('titleItemPerCart')}
            </p>

            {cartLength > ITEMS_PER_FLYOUT ? (
              <Slider books={cart}>{DemonstrationBooks}</Slider>
            ) : (
              <div className={styles.itemContainer}>
                {cart.map(book => (
                  <BookCard key={book.id} book={book} isFlyout />
                ))}
              </div>
            )}
          </>
        ) : (
          <p>{t('titleEmpty')}</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleUnselectAllButton}>
          {t('titleUnselectAllButton')}
        </Button>

        <DownloadBooksButton />
      </div>
    </div>
  );
};
