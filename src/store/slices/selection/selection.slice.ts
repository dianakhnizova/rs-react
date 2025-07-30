import { ValueState } from '@/sources/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ValueState = {
  isSelected: true,
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {},
});

export const selectionReducer = selectionSlice.reducer;
export const selectionActions = selectionSlice.actions;
