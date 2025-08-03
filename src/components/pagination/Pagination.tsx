import classNames from 'classnames';
import { Button } from '../button/Button';
import { messages } from './messages';
import styles from './Pagination.module.scss';
import { useTheme } from '@/utils/ThemeContext';
import { Theme } from '@/sources/enums';
import { ButtonVariant } from '../button/enum';

interface Props {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: Props) => {
  const { theme } = useTheme();

  const handlePrevButton = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextButton = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <Button
        onClick={handlePrevButton}
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
      </p>

      <Button
        onClick={handleNextButton}
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
