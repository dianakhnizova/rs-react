'use client';

import { useTheme } from '@/utils/ThemeContext';
import { Button } from '../button/Button';
import styles from './Slider.module.scss';
import { Theme } from '@/sources/enums';
import { useEffect, useState } from 'react';
import { ButtonVariant } from '../button/enum';
import classNames from 'classnames';
import { IBookData } from '@/sources/interfaces';
import { ITEMS_PER_FLYOUT } from '@/sources/constants';
import React from 'react';
import { FC } from 'react';

interface Props {
  books: IBookData[];
  children: FC<{ books: IBookData[] }>;
}

export const Slider: FC<Props> = ({ books, children }) => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = Math.ceil(books.length / ITEMS_PER_FLYOUT);

  const demonstrationBooks = books.slice(
    (currentSlide - 1) * ITEMS_PER_FLYOUT,
    currentSlide * ITEMS_PER_FLYOUT
  );

  const handlePrevButton = () => {
    setCurrentSlide(prev => prev - 1);
  };

  const handleNextButton = () => {
    setCurrentSlide(prev => prev + 1);
  };

  useEffect(() => {
    if (currentSlide > totalSlides) {
      setCurrentSlide(totalSlides === 0 ? 1 : totalSlides);
    }
  }, [books.length, totalSlides, currentSlide]);

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

      <div className={styles.sliderContent}>
        {React.createElement(children, { books: demonstrationBooks })}
      </div>

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
