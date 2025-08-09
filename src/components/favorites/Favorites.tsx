import styles from './Favorites.module.scss';
import FavoritesDarkIcon from '@/assets/light-theme/favorites-dark.svg';
import FavoritesLightIcon from '@/assets/dark-theme/favorites-light.svg';
import { selectCart } from '@/store/slices/cart/selectors';
import { useAppSelector } from '@/utils/hooks/useAppSelector';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { messages } from './messages';

export const Favorites = () => {
  const cart = useAppSelector(selectCart);
  const { theme } = useTheme();

  return (
    <div className={styles.container}>
      <p className={styles.title}>{cart.length}</p>

      <img
        src={theme === Theme.DARK ? FavoritesLightIcon : FavoritesDarkIcon}
        alt={messages.altTitle}
        className={styles.icon}
      />
    </div>
  );
};
