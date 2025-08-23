import { messages } from '@/sources/messages';
import { Button } from '../button/Button';
import { UserData } from '../user-data/UserData';
import styles from './UserList.module.scss';
import type { FC } from 'react';

interface Props {
  onClose: (value: boolean) => void;
}
export const UserList: FC<Props> = ({ onClose }) => {
  const handleCloseButton = () => {
    onClose(false);
  };

  return (
    <div className={styles.container}>
      <UserData />

      <Button onClick={handleCloseButton}>{messages.button.closeButton}</Button>
    </div>
  );
};
