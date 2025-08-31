import { Search } from '../search/Search';
import { SelectYear } from './components/select-year/SelectYear';
import { Sort } from './components/sort/Sort';
import styles from './Filter.module.scss';

export const Filter = () => {
  return (
    <div className={styles.container}>
      <Search />

      <SelectYear />
      <Sort />
    </div>
  );
};
