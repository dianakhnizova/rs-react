import styles from './ProductsSection.module.scss';
import { ProductsHeader } from './components/products-header/ProductsHeader';

interface Props {
  children: React.ReactNode;
}

export const ProductsSection = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <ProductsHeader />
      <div className={styles.gridDivider} />
      {children}
    </div>
  );
};
