import { SortOrder } from '@/sources/enums';
import { CountryData } from '@/sources/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CountryState {
  countries: CountryData[];
  selectedCountry: string | null;
  sortOrder: SortOrder;
}

const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
  sortOrder: SortOrder.NAME_ASC,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setSelectedCountry: (state, action: { payload: string | null }) => {
      state.selectedCountry =
        state.selectedCountry === action.payload ? null : action.payload;
    },
    setCountries: (state, action: { payload: CountryData[] }) => {
      state.countries = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<CountryState['sortOrder']>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const countryReducer = countrySlice.reducer;
export const countryActions = countrySlice.actions;
