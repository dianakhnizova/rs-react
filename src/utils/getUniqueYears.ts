import { CountryData } from '@/sources/interfaces';

export const getUniqueYears = (countries: CountryData[]) => {
  return [
    ...new Set(countries.flatMap(country => country.data.map(d => d.year))),
  ];
};
