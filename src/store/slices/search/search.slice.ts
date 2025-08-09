import { LocalStorage } from '@/sources/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchState {
  searchTerm: string;
}

const initialState: searchState = {
  searchTerm: localStorage.getItem(LocalStorage.SEARCH_KEY) || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;
