import { Component } from 'react';
import styles from './HomePage.module.scss';

export class HomePage extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <h2>Home Page</h2>
      </div>
    );
  }
}
