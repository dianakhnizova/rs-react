import { messages } from '@/sources/messages';
import { Button } from '../button/Button';
import styles from './ColumnPicker.module.scss';
import { Input } from '../input/Input';
import { columnPicker } from './columnPickerList';
import { FC, useCallback } from 'react';
import { SelectedColumn } from '@/sources/types';
import { useSelector } from 'react-redux';
import { selectColumns } from '@/store/slices/selected-column/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { isColumnSelected } from '@/utils/isColumnSelected';

interface Props {
  onSelect: (selected: SelectedColumn[]) => void;
}

export const ColumnPicker: FC<Props> = ({ onSelect }) => {
  const selectedColumns = useSelector(selectColumns);
  const { selectColumn, removeColumn } = useActions();

  const toggleCheckbox = useCallback(
    (column: { key: string; label: string }) => {
      const isSelected = isColumnSelected(selectedColumns, column);

      if (!isSelected) {
        selectColumn(column);
      } else {
        removeColumn({ key: column.key });
      }
    },
    [selectedColumns, selectColumn, removeColumn]
  );

  const handleSelectButton = useCallback(() => {
    onSelect(selectedColumns);
  }, [onSelect, selectedColumns]);

  return (
    <div className={styles.container}>
      <div className={styles.checkboxContainer}>
        {columnPicker.map(column => (
          <Input
            key={column.id}
            id={column.id}
            htmlFor={column.htmlFor}
            type={column.type}
            label={column.label}
            checked={isColumnSelected(selectedColumns, {
              key: column.key,
              label: column.label,
            })}
            isCheckbox
            isLabel
            onChange={() =>
              toggleCheckbox({ key: column.key, label: column.label })
            }
          />
        ))}
      </div>

      <Button onClick={handleSelectButton}>
        {messages.button.selectColumn}
      </Button>
    </div>
  );
};
