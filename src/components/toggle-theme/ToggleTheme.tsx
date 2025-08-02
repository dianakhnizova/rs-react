import { useTheme } from '@/utils/ThemeContext';
import styles from './ToggleTheme.module.scss';
import { Button } from '../button/Button';
import classNames from 'classnames';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <Button
        onClick={toggleTheme}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.toggleButton, {
          [styles.toggleLightButton]: theme === Theme.LIGHT,
        })}
      />
    </div>
  );
};
