import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchTermState {
  searchTerm: string;
}

const initialState: searchTermState = {
  searchTerm: '',
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const searchTermReducer = searchTermSlice.reducer;
export const searchTermActions = searchTermSlice.actions;
