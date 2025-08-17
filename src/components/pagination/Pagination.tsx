'use client';

import { Button } from '../button/Button';
import styles from './Pagination.module.scss';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  ArrowNextDarkTheme,
  ArrowNextHover,
  ArrowNextLightTheme,
  ArrowPrevDarkTheme,
  ArrowPrevHover,
  ArrowPrevLightTheme,
} from './constants';

interface Props {
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
}

export const Pagination: FC<Props> = ({
  currentPage,
  totalPages,
  handlePrev,
  handleNext,
}) => {
  const t = useTranslations('Pagination');
  const a = useTranslations('Alt');

  const { theme } = useTheme();
  const [hoveredPrev, setHoveredPrev] = useState(false);
  const [hoveredNext, setHoveredNext] = useState(false);

  const iconPrev = hoveredPrev
    ? ArrowPrevHover
    : theme === Theme.DARK
      ? ArrowPrevDarkTheme
      : ArrowPrevLightTheme;

  const iconNext = hoveredNext
    ? ArrowNextHover
    : theme === Theme.DARK
      ? ArrowNextDarkTheme
      : ArrowNextLightTheme;

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant={ButtonVariant.SECONDARY}
        onMouseEnter={() => setHoveredPrev(true)}
        onMouseLeave={() => setHoveredPrev(false)}
      >
        <Image src={iconPrev} alt={a('prevTitle')} width={16} height={16} />
      </Button>

      <p className={styles.pageNumberContainer}>
        {t('pageTitle')}
        {currentPage}
        {t('ofTitle')}
        {totalPages}
      </p>

      <Button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        variant={ButtonVariant.SECONDARY}
        onMouseEnter={() => setHoveredNext(true)}
        onMouseLeave={() => setHoveredNext(false)}
      >
        <Image src={iconNext} alt={a('nextTitle')} width={16} height={16} />
      </Button>
    </div>
  );
};
