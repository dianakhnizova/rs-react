'use client';

import { useTheme } from '@/utils/ThemeContext';
import styles from './ToggleTheme.module.scss';
import { Button } from '../button/Button';
import Image from 'next/image';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TogglerDarkTheme, TogglerHover, TogglerLightTheme } from './constants';

export const ToggleTheme = () => {
  const a = useTranslations('Alt');

  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const iconSrc = hovered
    ? TogglerHover
    : theme === Theme.DARK
      ? TogglerDarkTheme
      : TogglerLightTheme;

  return (
    <div className={styles.container}>
      <Button
        onClick={toggleTheme}
        variant={ButtonVariant.SECONDARY}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={iconSrc} alt={a('themeTitle')} width={16} height={16} />
      </Button>
    </div>
  );
};
