import { ProductsHeader } from '@/components/products-header/ProductsHeader';
import styles from './BookDetailSection.module.scss';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetails';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { PagePath } from '@/router/enums';
import { titleList } from '@/components/products-header/productsTitleList';

export const BookDetailSection = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  if (!id) {
    return <p className={styles.error}>{messages.notFoundIdTitle}</p>;
  }

  const handleCloseButton = () => {
    void navigate(`${PagePath.root}?page=${page}`);
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

      <BooksDetails bookId={id} />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </section>
  );
};
