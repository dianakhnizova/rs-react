import { IBookData } from '@/sources/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: IBookData[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IBookData>) => {
      state.cart.push(action.payload);
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter(book => book.id !== action.payload.id);
    },

    clearCart: state => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
