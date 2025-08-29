import { createSlice } from '@reduxjs/toolkit';

interface YearState {
  year: string | null;
}

const initialState: YearState = {
  year: null,
};

export const yearSlice = createSlice({
  name: 'year',
  initialState,
  reducers: {
    setSelectedYear: (state, action: { payload: string | null }) => {
      state.year = state.year === action.payload ? null : action.payload;
    },
  },
});

export const yearReducer = yearSlice.reducer;
export const yearActions = yearSlice.actions;
