import { ProductsHeader } from '@/components/products-header/ProductsHeader';
import styles from './BookDetailSection.module.scss';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetails';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { titleList } from '@/components/products-header/productsTitleList';
import { BookData } from '@/sources/types';

export const BookDetailSection = () => {
  const { bookDetails } = useOutletContext<{ bookDetails: BookData | null }>();
  const { page = '1' } = useParams();
  const navigate = useNavigate();

  if (!bookDetails) {
    return <p className={styles.error}>{messages.notFoundIdTitle}</p>;
  }

  const handleCloseButton = () => {
    void navigate(`/${page}`);
  };

  return (
    <section className={styles.container}>
      <ProductsHeader
        description={titleList.description}
        authors={titleList.authors}
        year={titleList.year}
        printType={titleList.printType}
      />

      <div className={styles.gridDivider} />

      <BooksDetails bookDetail={bookDetails} />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </section>
  );
};
