import { ProductsHeader } from '@/components/products-header/ProductsHeader';
import styles from './BookDetailPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetails';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { PagePath } from '@/router/enums';
import { titleList } from '@/components/products-header/productsTitleList';
import { useSearchParams } from 'react-router-dom';

export const BookDetailPage = () => {
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
        pageCount={titleList.pageCount}
        printType={titleList.printType}
      />

      <div className={styles.gridDivider} />

      <BooksDetails bookId={id} />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </section>
  );
};
