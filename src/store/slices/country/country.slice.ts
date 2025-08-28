import { CountryData } from '@/sources/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface CountryState {
  countries: CountryData[];
  selectedCountry: string | null;
}

const initialState: CountryState = {
  countries: [],
  selectedCountry: null,
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
  },
});

export const countryReducer = countrySlice.reducer;
export const countryActions = countrySlice.actions;
