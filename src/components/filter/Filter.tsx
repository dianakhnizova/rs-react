import { SelectYear } from './components/select-year/SelectYear';
import styles from './Filter.module.scss';

export const Filter = () => {
  return (
    <div className={styles.container}>
      <SelectYear />
    </div>
  );
};
