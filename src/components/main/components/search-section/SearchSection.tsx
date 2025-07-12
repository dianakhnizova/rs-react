import React, { Component } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';
import { Button } from '@/components/button/Button';

interface Props {
  onSearch: (value: string) => void;
}

interface State {
  searchInput: string;
}

export class SearchSection extends Component<Props> {
  public state: State = {
    searchInput: localStorage.getItem('searchInput') || '',
  };

  public handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({ searchInput: value });
  };

  public handleSearchClick = () => {
    localStorage.setItem('searchInput', this.state.searchInput);
    this.props.onSearch(this.state.searchInput);
  };

  public render() {
    return (
      <form className={styles.container}>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.state.searchInput}
          placeholder={messages.inputPlaceholder}
          className={styles.input}
        />

        <Button onClick={this.handleSearchClick} className={styles.button}>
          {messages.searchButton}
        </Button>
      </form>
    );
  }
}
