import { Component } from 'react';
import styles from './Header.module.scss';
import { messages } from './messages';

export class Header extends Component {
  public render() {
    return (
      <header className={styles.container}>
        <h3>{messages.appTitle}</h3>
      </header>
    );
  }
}
