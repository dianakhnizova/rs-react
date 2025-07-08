import { Component } from 'react';
import styles from './Title.module.scss';
import { messages } from './messages';

export class Title extends Component {
  public render() {
    return (
      <h4 className={styles.resultContainer}>
        <p className={styles.titleName}>{messages.titleName}</p>
        <p className={styles.titleDescription}>{messages.titleDescription}</p>
        <p className={styles.titleImage}>{messages.titleImage}</p>
      </h4>
    );
  }
}
