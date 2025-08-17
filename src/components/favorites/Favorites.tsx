'use client';

import styles from './Favorites.module.scss';
import Image from 'next/image';
import { selectCart } from '@/store/slices/cart/selectors';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { messages } from './messages';

const FavoritesDarkIcon = '/light-theme/favorites-dark.svg';
const FavoritesLightIcon = '/dark-theme/favorites-light.svg';

export const Favorites = () => {
  const cart = useAppSelector(selectCart);
  const { theme } = useTheme();

  return (
    <div className={styles.container}>
      <p className={styles.title}>{cart.length}</p>

      <Image
        src={theme === Theme.DARK ? FavoritesLightIcon : FavoritesDarkIcon}
        alt={messages.altTitle}
        width={20}
        height={20}
      />
    </div>
  );
};
