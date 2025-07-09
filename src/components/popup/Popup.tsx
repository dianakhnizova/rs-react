import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './Popup.module.scss';
import { messages } from './messages';

interface Props {
  isLoading: boolean;
  onClose: () => void;
  children: ReactNode;
}

export class Popup extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { isLoading, onClose, children } = this.props;

    return (
      <>
        {isLoading && (
          <>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.container}>
              {children}
              <button onClick={onClose} className={styles.button}>
                {messages.closeButton}
              </button>
            </div>
          </>
        )}
      </>
    );
  }
}
