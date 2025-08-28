import { messages } from '@/sources/messages';
import { Button } from '../button/Button';
import styles from './ColumnPicker.module.scss';
import { Input } from '../input/Input';
import { columnPicker } from './columnPickerList';

export const ColumnPicker = () => {
  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        {columnPicker.map(column => (
          <Input
            id={column.id}
            htmlFor={column.htmlFor}
            type={column.type}
            label={column.label}
            isCheckbox
          />
        ))}
      </div>

      <Button>{messages.button.selectColumn}</Button>
    </div>
  );
};
