import { Component } from 'react';
import styles from './ProductsSection.module.scss';
import { Title } from './components/title/Title';
import { BooksList } from './components/books-list/BooksList';

interface Props {
  searchTerm: string;
  setLoading: (value: boolean) => void;
}

export class ProductsSection extends Component<Props> {
  public render() {
    return (
      <div className={styles.container}>
        <Title />
        <div className={styles.gridDivider} />
        <BooksList
          setLoading={this.props.setLoading}
          searchTerm={this.props.searchTerm}
        />
      </div>
    );
  }
}
