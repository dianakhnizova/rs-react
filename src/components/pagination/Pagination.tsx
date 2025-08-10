import classNames from 'classnames';
import { Button } from '../button/Button';
import { messages } from './messages';
import styles from './Pagination.module.scss';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';
import { FC } from 'react';

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
  const { theme } = useTheme();

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, {
          [styles.arrowPrevLightButton]: theme === Theme.LIGHT,
        })}
        data-testid="pagination-button"
      />

      <p data-testid="page-number" className={styles.pageNumberContainer}>
        {messages.pageTitle}
        {currentPage}
        {messages.ofTitle}
        {totalPages}
      </p>

      <Button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        variant={ButtonVariant.SECONDARY}
        className={classNames(styles.arrowPrevButton, styles.arrowNextButton, {
          [styles.arrowNextLightButton]: theme === Theme.LIGHT,
        })}
        data-testid="pagination-button"
      />
    </div>
  );
};
