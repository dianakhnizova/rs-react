import type { Country } from '@/sources/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [
    { id: '1', name: 'Afghanistan' },
    { id: '2', name: 'Albania' },
    { id: '3', name: 'Algeria' },
    { id: '4', name: 'Andorra' },
    { id: '5', name: 'Angola' },
    { id: '6', name: 'Antigua and Barbuda' },
    { id: '7', name: 'Argentina' },
    { id: '8', name: 'Armenia' },
    { id: '9', name: 'Australia' },
    { id: '10', name: 'Austria' },
    { id: '11', name: 'Azerbaijan' },
    { id: '12', name: 'Bahamas' },
    { id: '13', name: 'Bahrain' },
    { id: '14', name: 'Bangladesh' },
    { id: '15', name: 'Barbados' },
    { id: '16', name: 'Belarus' },
    { id: '17', name: 'Belgium' },
    { id: '18', name: 'Belize' },
    { id: '19', name: 'Benin' },
    { id: '20', name: 'Bhutan' },
    { id: '21', name: 'Bolivia' },
    { id: '22', name: 'Bosnia and Herzegovina' },
    { id: '23', name: 'Botswana' },
    { id: '24', name: 'Brazil' },
    { id: '25', name: 'Brunei' },
    { id: '26', name: 'Bulgaria' },
    { id: '27', name: 'Burkina Faso' },
    { id: '28', name: 'Burundi' },
    { id: '29', name: 'Cabo Verde' },
    { id: '30', name: 'Cambodia' },
    { id: '31', name: 'Cameroon' },
    { id: '32', name: 'Canada' },
    { id: '33', name: 'Central African Republic' },
    { id: '34', name: 'Chad' },
    { id: '35', name: 'Chile' },
    { id: '36', name: 'China' },
    { id: '37', name: 'Colombia' },
    { id: '38', name: 'Comoros' },
    { id: '39', name: 'Congo (Congo-Brazzaville)' },
    { id: '40', name: 'Congo (Congo-Kinshasa)' },
    { id: '41', name: 'Costa Rica' },
    { id: '42', name: 'Croatia' },
    { id: '43', name: 'Cuba' },
    { id: '44', name: 'Cyprus' },
    { id: '45', name: 'Czechia' },
    { id: '46', name: 'Denmark' },
    { id: '47', name: 'Djibouti' },
    { id: '48', name: 'Dominica' },
    { id: '49', name: 'Dominican Republic' },
    { id: '50', name: 'Ecuador' },
  ],
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const countryReducer = countrySlice.reducer;
export const countryActions = countrySlice.actions;
