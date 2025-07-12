import { Component } from 'react';
import styles from './Footer.module.scss';
import { messages } from './messages';

export class Footer extends Component {
  public render() {
    return (
      <footer className={styles.container}>
        <p>{messages.bottomTitle}</p>
      </footer>
    );
  }
}
