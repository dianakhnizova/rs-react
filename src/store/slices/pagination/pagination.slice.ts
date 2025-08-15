import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
};

export const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const paginationReducer = PaginationSlice.reducer;
export const paginationActions = PaginationSlice.actions;
