import { Component } from 'react';
import styles from './Footer.module.scss';

export class Footer extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <h2>Footer</h2>
      </div>
    );
  }
}
