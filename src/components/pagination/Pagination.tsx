import classNames from 'classnames';
import { Button } from '../button/Button';
import { messages } from './messages';
import styles from './Pagination.module.scss';

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
        className={styles.arrowPrevButton}
      />

      <p data-testid="page-number" className={styles.pageNumberContainer}>
        {messages.pageTitle}
        {currentPage}
      </p>

      <Button
        onClick={handleNextButton}
        disabled={currentPage >= totalPages}
        className={classNames(styles.arrowPrevButton, styles.arrowNextButton)}
      />
    </div>
  );
};
