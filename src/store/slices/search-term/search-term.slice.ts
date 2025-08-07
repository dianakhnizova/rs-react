import { LocalStorage } from '@/sources/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchTermState {
  searchTerm: string;
}

const initialState: searchTermState = {
  searchTerm: (localStorage.getItem(LocalStorage.SEARCH_KEY) || '').trim(),
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorage.setItem(LocalStorage.SEARCH_KEY, action.payload.trim());
    },
  },
});

export const searchTermReducer = searchTermSlice.reducer;
export const searchTermActions = searchTermSlice.actions;
