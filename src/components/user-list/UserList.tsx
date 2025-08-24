import { UserData } from '../user-data/UserData';
import styles from './UserList.module.scss';
import type { FC } from 'react';

export const UserList: FC = () => {
  return (
    <div data-testid="user-list-container" className={styles.container}>
      <UserData />
    </div>
  );
};
