import { IBookData } from '@/sources/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IBookData[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IBookData>) => {
      state.push(action.payload);
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
