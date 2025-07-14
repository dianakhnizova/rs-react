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
    localStorage.setItem('searchInput', this.state.searchInput.trim());
    this.props.onSearch(this.state.searchInput);
  };

  public handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.handleSearchClick();
  };

  public render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        <input
          onChange={this.handleInputChange}
          type="text"
          value={this.state.searchInput}
          placeholder={messages.inputPlaceholder}
          className={styles.input}
        />

        <Button className={styles.button}>{messages.searchButton}</Button>
      </form>
    );
  }
}
