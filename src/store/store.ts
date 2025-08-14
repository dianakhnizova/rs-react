import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart/cart.slice';
import { searchReducer } from './slices/search/search.slice';
import { paginationReducer } from './slices/pagination/pagination.slice';

const reducers = combineReducers({
  cart: cartReducer,
  search: searchReducer,
  pagination: paginationReducer,
});

export const makeStore = (initialPage = 1) =>
  configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    preloadedState: {
      pagination: {
        currentPage: initialPage,
        totalItems: 0,
      },
    },
  });

export const store = makeStore();

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
