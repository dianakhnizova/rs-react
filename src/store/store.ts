import { configureStore } from '@reduxjs/toolkit';
import { columnReducer } from './slices/selected-column/selectedColumn.slice';
import { searchTermReducer } from './slices/search-term/searchTerm.slice';
import { yearReducer } from './slices/year/year.slice';
import { sortReducer } from './slices/sort/sort.slice';

export const store = configureStore({
  reducer: {
    columns: columnReducer,
    sort: sortReducer,
    searchTerm: searchTermReducer,
    year: yearReducer,
  },
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
