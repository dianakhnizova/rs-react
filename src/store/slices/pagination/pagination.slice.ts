import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalItems: 0,
};

export const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const paginationReducer = PaginationSlice.reducer;
export const paginationActions = PaginationSlice.actions;
