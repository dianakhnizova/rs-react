import { bookApi } from '@/api/book.api';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [bookApi.reducerPath]: bookApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(bookApi.middleware),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
