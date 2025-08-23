import { useUserDataFields } from '@/utils/hooks/useUserDataFields';
import styles from './UserData.module.scss';

export const UserData = () => {
  const allUsersData = useUserDataFields();

  return (
    <div className={styles.container}>
      {allUsersData.map((userDataList, index) => (
        <div key={index} className={styles.userCard}>
          {userDataList.map((field, index) => (
            <div key={index} className={styles.data}>
              <span className={styles.label}>{field.label}: </span>
              {field.label === 'Photo' && field.data ? (
                <img
                  src={field.data as string}
                  alt="User"
                  className={styles.photo}
                />
              ) : (
                <span>{field.data.toString()}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
