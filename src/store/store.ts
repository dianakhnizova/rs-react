import { bookApi } from '@/api/book.api';
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart/cart.slice';
import { selectionReducer } from './slices/selection/selection.slice';
import { isCartReducer } from './slices/cart/is-cart.slice';
import { selectItemReducer } from './slices/select-item/selectItem.slice';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
    cart: cartReducer,
    selection: selectionReducer,
    isCart: isCartReducer,
    selectItem: selectItemReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
