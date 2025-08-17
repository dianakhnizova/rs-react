'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../button/Button';
import Image from 'next/image';
import styles from './ToggleLanguage.module.scss';
import { Theme } from '@/sources/enums';
import { useState } from 'react';
import { useTheme } from '@/utils/ThemeContext';
import { ButtonVariant } from '../button/enum';
import { useTranslations } from 'next-intl';
import { TogglerDarkTheme, TogglerHover, TogglerLightTheme } from './constants';

export const ToggleLanguage = () => {
  const a = useTranslations('Alt');

  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  const iconSrc = hovered
    ? TogglerHover
    : theme === Theme.DARK
      ? TogglerDarkTheme
      : TogglerLightTheme;

  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    if (!pathname) return;

    if (pathname.startsWith('/en')) {
      router.push(pathname.replace('/en', '/ru'));
    } else if (pathname.startsWith('/ru')) {
      router.push(pathname.replace('/ru', '/en'));
    } else {
      router.push(`/en${pathname}`);
    }
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={toggleLanguage}
        variant={ButtonVariant.SECONDARY}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.toggleButton}
      >
        <Image src={iconSrc} alt={a('languageTitle')} width={16} height={16} />
      </Button>
    </div>
  );
};
