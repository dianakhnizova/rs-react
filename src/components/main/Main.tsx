import { Component } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ProductsSection } from './components/products-section/ProductsSection';

export class Main extends Component {
  public state = {
    searchTerm: '',
  };

  public handleSearchQuery = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  public render() {
    return (
      <section className={styles.container}>
        <SearchSection onSearch={this.handleSearchQuery} />
        <ProductsSection searchTerm={this.state.searchTerm} />
      </section>
    );
  }
}
