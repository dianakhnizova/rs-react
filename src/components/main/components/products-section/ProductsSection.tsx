import { Component } from 'react';
import styles from './ProductsSection.module.scss';
import { ProductsHeader } from './components/products-header/ProductsHeader';
import { BooksList } from './components/books-list/BooksList';

interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
  onClose: () => void;
  isLoading: boolean;
  setError: (message: string) => void;
}

export class ProductsSection extends Component<Props> {
  public render() {
    return (
      <div className={styles.container}>
        <ProductsHeader />
        <div className={styles.gridDivider} />
        <BooksList {...this.props} />
      </div>
    );
  }
}
