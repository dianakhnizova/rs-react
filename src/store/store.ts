import { configureStore } from '@reduxjs/toolkit';
import { columnReducer } from './slices/selected-column/selectedColumn.slice';
import { countryReducer } from './slices/country/country.slice';
import { searchTermReducer } from './slices/search-term/searchTerm.slice';

export const store = configureStore({
  reducer: {
    columns: columnReducer,
    countries: countryReducer,
    searchTerm: searchTermReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
