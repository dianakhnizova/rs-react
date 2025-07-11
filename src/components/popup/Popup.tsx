import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './Popup.module.scss';
import { messages } from './messages';
import { Button } from '../button/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export class Popup extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { isOpen, onClose, children } = this.props;

    return (
      <>
        {isOpen && (
          <>
            <div className={styles.overlay} onClick={onClose} />

            <div className={styles.container}>
              {children}
              <Button onClick={onClose}>{messages.closeButton}</Button>
            </div>
          </>
        )}
      </>
    );
  }
}
