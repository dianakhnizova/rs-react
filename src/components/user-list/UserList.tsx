import { UserData } from '../user-data/UserData';
import styles from './UserList.module.scss';
import type { FC } from 'react';

export const UserList: FC = () => {
  return (
    <div className={styles.container}>
      <UserData />
    </div>
  );
};
