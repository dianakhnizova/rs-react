import { SortOrder } from '@/sources/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  sortOrder: SortOrder | null;
}

const initialState: SortState = {
  sortOrder: SortOrder.NAME_ASC,
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOrder: (state, action: PayloadAction<SortState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const sortReducer = sortSlice.reducer;
export const sortActions = sortSlice.actions;
