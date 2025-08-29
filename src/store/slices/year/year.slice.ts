import { createSlice } from '@reduxjs/toolkit';

interface YearState {
  years: number[];
  selectedYear: number | null;
}

const initialState: YearState = {
  years: [],
  selectedYear: null,
};

export const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setSelectedYear: (state, action: { payload: number | null }) => {
      state.selectedYear =
        state.selectedYear === action.payload ? null : action.payload;
    },
    setYears: (state, action: { payload: number[] }) => {
      state.years = action.payload;
    },
  },
});

export const yearReducer = yearSlice.reducer;
export const yearActions = yearSlice.actions;
