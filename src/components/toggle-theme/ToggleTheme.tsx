'use client';

import { useTheme } from '@/utils/ThemeContext';
import styles from './ToggleTheme.module.scss';
import { Button } from '../button/Button';
import Image from 'next/image';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';
import { messages } from './messages';
import { useState } from 'react';

const TogglerDarkTheme = '/dark-theme/toggler-light.svg';
const TogglerLightTheme = '/light-theme/toggler-dark.svg';
const TogglerHover = '/hover/toggler-hover.svg';

export const ToggleTheme = () => {
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
        <Image src={iconSrc} alt={messages.altTitle} width={16} height={16} />
      </Button>
    </div>
  );
};
