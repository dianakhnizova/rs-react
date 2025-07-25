import styles from './ProductsSection.module.scss';
import { ProductsHeader } from '../../../../components/products-header/ProductsHeader';
import { titleList } from '@/components/products-header/productsTitleList';

interface Props {
  children: React.ReactNode;
}

export const ProductsSection = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <ProductsHeader
        title={titleList.title}
        description={titleList.description}
        image={titleList.image}
      />

      <div className={styles.gridDivider} />

      {children}
    </div>
  );
};
