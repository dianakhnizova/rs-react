import type { FC } from 'react';
import React from 'react';
import styles from './Form.module.scss';
import { Button } from '../button/Button';
import { ButtonType } from '@/sources/enums';
import { messages } from '@/sources/messages';

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form: FC<Props> = ({ onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.container}>{children}</div>

      <Button type={ButtonType.SUBMIT}>{messages.button.submitButton}</Button>
    </form>
  );
};
