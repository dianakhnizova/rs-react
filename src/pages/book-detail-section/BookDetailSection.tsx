import { ProductsHeader } from '@/components/products-header/ProductsHeader';
import styles from './BookDetailSection.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetails';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { titleList } from '@/components/products-header/productsTitleList';

export const BookDetailSection = () => {
  const { detailsId, page = '1' } = useParams();
  const navigate = useNavigate();

  if (!detailsId) {
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

      <BooksDetails />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </section>
  );
};
