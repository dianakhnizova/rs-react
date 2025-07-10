import React, { Component } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';

interface Props {
  searchInput: string;
  onSearch: (value: string) => void;
}

export class SearchSection extends Component<Props> {
  public state = {};
  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.props.onSearch(value);
  };

  public handleSearchClick = () => {
    this.props.onSearch(this.props.searchInput);
  };

  public render() {
    return (
      <div className={styles.container}>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.props.searchInput}
          placeholder={messages.inputPlaceholder}
          className={styles.input}
        />
        <button onClick={this.handleSearchClick} className={styles.button}>
          {messages.searchButton}
        </button>
      </div>
    );
  }
}
