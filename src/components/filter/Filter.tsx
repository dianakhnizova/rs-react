import { SelectYear } from './components/select-year/SelectYear';
import { Sort } from './components/sort/Sort';
import styles from './Filter.module.scss';

export const Filter = () => {
  return (
    <div className={styles.container}>
      <SelectYear />
      <Sort />
    </div>
  );
};
