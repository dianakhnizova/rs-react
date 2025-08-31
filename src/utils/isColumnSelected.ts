import { SelectedColumn } from '@/sources/types';

export const isColumnSelected = (
  allColumns: SelectedColumn[],
  column: SelectedColumn
) => {
  const isSelected = allColumns.some(
    selectedColumn => selectedColumn.key === column.key
  );

  return isSelected;
};
