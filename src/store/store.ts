import { configureStore } from '@reduxjs/toolkit';
import { countryReducer } from './slices/country/country.slice';
import { imageReducer } from './slices/image/image.slice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    image: imageReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
