import { TypeRootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectColumns = (state: TypeRootState) => state.columns.columns;

export const selectColumnLabels = createSelector([selectColumns], columns =>
  columns.map(column => column.label)
);

export const selectColumnKeys = createSelector([selectColumns], columns =>
  columns.map(column => column.key)
);
