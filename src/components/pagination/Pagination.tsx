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
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextButton = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Button onClick={handlePrevButton} disabled={currentPage === 1}>
        {messages.prevButton}
      </Button>

      <p data-testid="page-number" className={styles.pageNumberContainer}>
        {messages.pageTitle}
        {currentPage}
      </p>

      <Button onClick={handleNextButton} disabled={currentPage >= totalPages}>
        {messages.nextButton}
      </Button>
    </div>
  );
};
