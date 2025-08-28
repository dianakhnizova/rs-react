import { InputType } from '@/sources/enums';
import { Input } from '../input/Input';
import { messages } from '@/sources/messages';
import { Button } from '../button/Button';
import styles from './Search.module.scss';

const handleSearch = () => {};

export const Search = () => {
  return (
    <div className={styles.container}>
      <Input
        id={InputType.TEXT}
        type={InputType.TEXT}
        placeholder={messages.button.search}
        isSearch
      />

      <Button onClick={handleSearch}>{messages.button.search}</Button>
    </div>
  );
};
