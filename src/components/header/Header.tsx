import { Component } from 'react';
import styles from './Header.module.scss';
import { messages } from './messages';

export class Header extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <p>{messages.appTitle}</p>
      </div>
    );
  }
}
