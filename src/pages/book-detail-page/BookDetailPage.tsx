import { ProductsHeader } from '@/components/products-header/ProductsHeader';
import styles from './BookDetailPage.module.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { BooksDetails } from './components/BooksDetailsList';
import { messages } from './messages';
import { Button } from '@/components/button/Button';
import { PagePath } from '@/router/enums';
import { titleList } from '@/components/products-header/productsTitleList';

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return <p className={styles.error}>{messages.notFounIdTitle}</p>;
  }

  const handleCloseButton = () => {
    void navigate(PagePath.root);
  };

  return (
    <div className={styles.container}>
      <ProductsHeader
        description={titleList.description}
        image={titleList.image}
      />

      <div className={styles.gridDivider} />

      <BooksDetails bookId={id} />

      <Button onClick={handleCloseButton}>{messages.closeButton}</Button>
    </div>
  );
};
