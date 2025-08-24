import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './slices/country/country.slice';
import { userReducer } from './slices/user/user.slice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    user: userReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
