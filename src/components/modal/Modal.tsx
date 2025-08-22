import type { FC, ReactNode } from 'react';
import { useLayoutEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import { Button } from '../button/Button';
import { messages } from '@/sources/messages';
import ReactPortal from '../react-portal/ReactPortal';
import { useEscapeKey } from '@/utils/hooks/useEscapeKey';

interface Props {
  isOpen: boolean;
  isError?: boolean;
  error?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal: FC<Props> = ({
  isOpen,
  isError,
  error,
  onClose,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  useEscapeKey(() => onClose?.(), isOpen);

  useLayoutEffect(() => {
    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement;

      setTimeout(() => {
        containerRef.current?.focus();
      }, 0);
    } else {
      lastActiveElement.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={styles.overlay} onClick={onClose} data-testid="popup" />

      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={styles.container}
      >
        {isError ? <p className={styles.error}>{error}</p> : children}

        {onClose && (
          <Button onClick={onClose}>{messages.button.closeButton}</Button>
        )}
      </div>
    </ReactPortal>
  );
};
