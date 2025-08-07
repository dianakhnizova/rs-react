import { bookApi } from '@/api/book.api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart/cart.slice';
import { searchTermReducer } from './slices/search-term/search-term.slice';

const reducers = combineReducers({
  [bookApi.reducerPath]: bookApi.reducer,
  cart: cartReducer,
  searchTerm: searchTermReducer,
});

export const store = configureStore({
  reducer: reducers,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
