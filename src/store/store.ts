import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './slices/country/country.slice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
