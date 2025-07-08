import { Component } from 'react';
import styles from './SearchSection.module.scss';
import { messages } from './messages';

export class SearchSection extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <input
          type="text"
          placeholder={messages.inputPlaceholder}
          className={styles.input}
        />
        <button className={styles.button}>{messages.searchButton}</button>
      </div>
    );
  }
}
