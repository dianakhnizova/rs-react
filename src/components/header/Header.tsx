import { Component } from 'react';
import styles from './Header.module.scss';

export class Header extends Component {
  public render() {
    return (
      <div className={styles.container}>
        <h2>Header</h2>
      </div>
    );
  }
}
