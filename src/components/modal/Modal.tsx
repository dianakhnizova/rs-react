import type { FC, ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import styles from './Modal.module.scss';
import { messages } from '@/sources/messages';
import ReactPortal from '../react-portal/ReactPortal';
import { useEscapeKey } from '@/utils/hooks/useEscapeKey';
import { Button } from '../button/Button';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  useEscapeKey(() => onClose?.(), isOpen);

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.container}>
        <p className={styles.error}>{children}</p>

        {onClose && <Button onClick={onClose}>{messages.button.close}</Button>}
      </div>
    </ReactPortal>
  );
};
