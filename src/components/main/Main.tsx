import { Component } from 'react';
import styles from './Main.module.scss';
import { SearchSection } from './components/search-section/SearchSection';
import { ProductsSection } from './components/products-section/ProductsSection';
import { Popup } from '../popup/Popup';
import { Spinner } from '../spinner/Spinner';
import { messages } from './messages';
import { Button } from '../button/button';

interface State {
  searchTerm: string;
  isLoading: boolean;
  isSimulateError: boolean;
  errorMessage: string | null;
}

export class Main extends Component {
  public state: State = {
    searchTerm: localStorage.getItem('searchInput') || '',
    isLoading: false,
    isSimulateError: false,
    errorMessage: '',
  };

  public handleSearchQuery = (searchTerm: string) => {
    this.setState({ searchTerm, errorMessage: null, isSimulateError: false });
    localStorage.setItem('searchInput', searchTerm);
  };

  public setLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  public onClose = () => {
    this.setState({
      isLoading: false,
      errorMessage: null,
      isSimulateError: false,
    });
  };

  public errorClick = () => {
    this.setState({ isSimulateError: true });
  };

  public setError = (message: string) => {
    this.setState({ errorMessage: message, isLoading: false });
  };

  public render() {
    if (this.state.isSimulateError) {
      throw new Error('Test render error');
    }

    return (
      <section className={styles.container}>
        <Popup
          isOpen={this.state.isLoading || !!this.state.errorMessage}
          onClose={this.onClose}
        >
          {this.state.errorMessage ? (
            <p className={styles.error}>{this.state.errorMessage}</p>
          ) : (
            <Spinner isLoading={this.state.isLoading} />
          )}
        </Popup>

        <SearchSection onSearch={this.handleSearchQuery} />

        <ProductsSection
          setLoading={this.setLoading}
          searchTerm={this.state.searchTerm}
          onClose={this.onClose}
          isLoading={this.state.isLoading}
          setError={this.setError}
        />

        <Button onClick={this.errorClick} className={styles.button}>
          {messages.errorButton}
        </Button>
      </section>
    );
  }
}
