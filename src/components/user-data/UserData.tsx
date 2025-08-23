import { useUserDataFields } from '@/utils/hooks/useUserDataFields';
import styles from './UserData.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const UserData = () => {
  const allUsersData = useUserDataFields();
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [prevLength, setPrevLength] = useState(0);

  useEffect(() => {
    if (allUsersData.length > prevLength) {
      const newIndex = allUsersData.length - 1;
      setHighlightIndex(newIndex);

      const timer = setTimeout(() => setHighlightIndex(null), 3000);
      return () => clearTimeout(timer);
    }

    setPrevLength(allUsersData.length);
  }, [allUsersData.length, prevLength]);

  return (
    <div className={styles.container}>
      {allUsersData.map((userDataList, index) => (
        <div
          key={index}
          className={classNames(styles.userCard, {
            [styles.highlight]: index === highlightIndex,
          })}
        >
          {userDataList.map((field, index) => (
            <div key={index} className={styles.data}>
              <span className={styles.label}>{field.label}: </span>
              {field.label === 'Photo' && field.data ? (
                <img src={field.data} alt="User" className={styles.photo} />
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
