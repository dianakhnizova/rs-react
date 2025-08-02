import { useTheme } from '@/utils/ThemeContext';
import { Button } from '../button/Button';
import styles from './Slider.module.scss';
import { Theme } from '@/sources/enums';
import { ReactNode } from 'react';
import { ButtonVariant } from '../button/enum';
import classNames from 'classnames';

interface Props {
  currentSlide: number;
  totalSlides: number;
  onSlideChange: (page: number) => void;
  children: ReactNode;
}

export const Slider = ({
  currentSlide,
  totalSlides,
  onSlideChange,
  children,
}: Props) => {
  const { theme } = useTheme();

  const handlePrevButton = () => {
    onSlideChange(currentSlide - 1);
  };

  const handleNextButton = () => {
    onSlideChange(currentSlide + 1);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrevButton}
        disabled={currentSlide === 1}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, {
          [styles.arrowPrevLightButton]: theme === Theme.LIGHT,
        })}
      />

      <div className={styles.sliderContent}>{children}</div>

      <Button
        onClick={handleNextButton}
        disabled={currentSlide >= totalSlides}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, styles.arrowNextButton, {
          [styles.arrowNextLightButton]: theme === Theme.LIGHT,
        })}
      />
    </div>
  );
};
