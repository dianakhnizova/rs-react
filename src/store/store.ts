import { configureStore } from '@reduxjs/toolkit';
import { columnReducer } from './slices/selected-column/selectedColumn.slice';

export const store = configureStore({
  reducer: {
    columns: columnReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
