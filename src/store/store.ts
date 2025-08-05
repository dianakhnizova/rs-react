import { bookApi } from '@/api/book.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart/cart.slice';

const reducers = combineReducers({
  [bookApi.reducerPath]: bookApi.reducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: reducers,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
