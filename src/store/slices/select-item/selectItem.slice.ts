import { ValueState } from '@/sources/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ValueState = {
  isSelectItem: false,
};

export const selectItemSlice = createSlice({
  name: 'selectItem',
  initialState,
  reducers: {
    setIsSelectItem: (state, action: PayloadAction<boolean>) => {
      state.isSelectItem = action.payload;
    },
  },
});

export const selectItemReducer = selectItemSlice.reducer;
export const selectItemActions = selectItemSlice.actions;
