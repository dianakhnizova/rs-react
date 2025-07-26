import type { ReactNode } from 'react';
import styles from './Popup.module.scss';
import { messages } from './messages';
import { Button } from '../button/Button';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const Popup = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} data-testid="popup" />

      <div className={styles.container}>
        {children}
        {onClose && <Button onClick={onClose}>{messages.closeButton}</Button>}
      </div>
    </>
  );
};
