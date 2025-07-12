import { Component } from 'react';
import styles from './Header.module.scss';
import { messages } from './messages';

export class Header extends Component {
  public render() {
    return (
      <header className={styles.container}>
        <h1 className={styles.title}>{messages.appTitle}</h1>
      </header>
    );
  }
}
