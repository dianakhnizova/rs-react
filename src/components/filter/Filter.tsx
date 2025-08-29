import { Select } from '../select/Select';
import styles from './Filter.module.scss';

export const Filter = () => {
  return (
    <div className={styles.container}>
      <Select />
    </div>
  );
};
