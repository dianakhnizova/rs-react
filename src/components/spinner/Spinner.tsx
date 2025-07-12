import { Component } from 'react';
import styles from './Spinner.module.scss';
import { messages } from './messages';
import BookImage from '@/assets/book.png';

interface Props {
  isLoading: boolean;
}

export class Spinner extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { isLoading } = this.props;
    if (!isLoading) return null;

    return (
      <div className={styles.container}>
        <img
          src={BookImage}
          alt={messages.titleSpinner}
          className={styles.image}
        />
        <h2 className={styles.loadingTitle}>{messages.titleLoading}</h2>
      </div>
    );
  }
}
