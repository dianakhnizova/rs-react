import { ValueState } from '@/sources/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ValueState = {
  isCart: true,
};

export const isCartSlice = createSlice({
  name: 'isCart',
  initialState,
  reducers: {},
});

export const isCartReducer = isCartSlice.reducer;
export const isCartActions = isCartSlice.actions;
