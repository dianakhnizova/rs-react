import styles from './BooksSection.module.scss';
import { ProductsHeader } from '../../../../components/products-header/ProductsHeader';
import { titleList } from '@/components/products-header/productsTitleList';

interface Props {
  children: React.ReactNode;
}

export const BooksSection = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <ProductsHeader title={titleList.title} image={titleList.image} />

      <div className={styles.gridDivider} />

      {children}
    </div>
  );
};
