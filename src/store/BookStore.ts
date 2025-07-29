import { bookApi } from '@/api/book.api';
import { configureStore } from '@reduxjs/toolkit';

export const bookStore = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type TypeRootState = ReturnType<typeof bookStore.getState>;
export type AppDispatch = typeof bookStore.dispatch;
