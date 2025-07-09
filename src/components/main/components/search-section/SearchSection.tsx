import React, { Component } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';

interface Props {
  onSearch: (value: string) => void;
}

export class SearchSection extends Component<Props> {
  public state = {
    searchInput: '',
  };

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ searchInput: value });

    this.props.onSearch(value);
  };

  public handleSearchQuery = () => {
    this.props.onSearch(this.state.searchInput);
  };

  public render() {
    return (
      <div className={styles.container}>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.state.searchInput}
          placeholder={messages.inputPlaceholder}
          className={styles.input}
        />
        <button onClick={this.handleSearchQuery} className={styles.button}>
          {messages.searchButton}
        </button>
      </div>
    );
  }
}
