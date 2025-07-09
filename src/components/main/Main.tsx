import { Component } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ProductsSection } from './components/products-section/ProductsSection';
import { Popup } from '../popup/Popup';
import { Spinner } from '../spinner/Spinner';

export class Main extends Component {
  public state = {
    searchTerm: localStorage.getItem('searchTerm') || '',
    isLoading: false,
  };

  public handleSearchQuery = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  };

  public setLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  public onClose = () => {
    this.setState({ isLoading: false });
  };

  public render() {
    return (
      <section className={styles.container}>
        <Popup isLoading={this.state.isLoading} onClose={this.onClose}>
          <Spinner isLoading={this.state.isLoading} />
        </Popup>

        <SearchSection
          onSearch={this.handleSearchQuery}
          searchInput={this.state.searchTerm}
        />
        <ProductsSection
          setLoading={this.setLoading}
          searchTerm={this.state.searchTerm}
        />
      </section>
    );
  }
}
