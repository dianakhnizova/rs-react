import { Component } from 'react';
import styles from './Main.module.scss';

export class Main extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <h2>Main</h2>
      </div>
    );
  }
}
