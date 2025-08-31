import { SelectedColumn } from '@/sources/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColumnState {
  columns: SelectedColumn[];
}

const initialState: ColumnState = {
  columns: [],
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    selectColumn: (state, action: PayloadAction<SelectedColumn>) => {
      state.columns.push(action.payload);
    },
    removeColumn: (state, action: PayloadAction<{ key: string }>) => {
      state.columns = state.columns.filter(
        column => column.key !== action.payload.key
      );
    },
  },
});

export const columnReducer = columnSlice.reducer;
export const columnActions = columnSlice.actions;
