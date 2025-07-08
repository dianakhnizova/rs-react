import { Component } from 'react';
import styles from './ResultSection.module.scss';
import { messages } from './messages';

export class ResultSection extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <div className={styles.resultContainer}>
          <p className={styles.titleName}>{messages.titleName}</p>
          <p className={styles.titleDescription}>{messages.titleDescription}</p>
          <p className={styles.titleImage}>{messages.titleImage}</p>

          <div className={styles.gridDivider}></div>

          <div className={styles.name}>
            <p>name</p>
          </div>
          <div className={styles.description}>
            <p>description</p>
          </div>
          <div className={styles.image}>
            <p>image</p>
          </div>
        </div>
        <button className={styles.button}>{messages.errorButton}</button>
      </div>
    );
  }
}
