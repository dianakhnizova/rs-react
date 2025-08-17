import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './slices/cart/cart.slice';

const reducers = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
