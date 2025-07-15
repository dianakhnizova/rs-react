import { Component } from 'react';
import styles from './ProductsHeader.module.scss';
import { messages } from './messages';

export class ProductsHeader extends Component {
  public render() {
    return (
      <div className={styles.productsHeaderContainer}>
        <p className={styles.titleName}>{messages.titleName}</p>
        <p className={styles.titleDescription}>{messages.titleDescription}</p>
        <p className={styles.titleImage}>{messages.titleImage}</p>
      </div>
    );
  }
}
