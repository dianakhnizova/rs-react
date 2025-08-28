import { messages } from '@/sources/messages';
import { Button } from '../button/Button';
import styles from './ColumnPicker.module.scss';
import { Input } from '../input/Input';
import { columnPicker } from './columnPickerList';
import { FC } from 'react';
import { SelectedColumn } from '@/sources/types';
import { useSelector } from 'react-redux';
import { selectColumns } from '@/store/slices/selected-column/selectors';
import { useActions } from '@/utils/hooks/useActions';

interface Props {
  onSelect: (selected: SelectedColumn[]) => void;
}

export const ColumnPicker: FC<Props> = ({ onSelect }) => {
  const selectedColumns = useSelector(selectColumns);
  const { selectColumn, removeColumn } = useActions();

  const toggleCheckbox = (column: { key: string; label: string }) => {
    const isSelected = selectedColumns.some(
      selectedColumn => selectedColumn.key === column.key
    );

    if (!isSelected) {
      selectColumn(column);
    } else {
      removeColumn({ key: column.key });
    }
  };

  const handleSelectButton = () => {
    onSelect(selectedColumns);
  };

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
            checked={selectedColumns.some(
              selectedColumn => selectedColumn.key === column.key
            )}
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
