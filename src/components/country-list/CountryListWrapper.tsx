import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';
import { useActions } from '@/utils/hooks/useActions';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';
import { selectCountry } from '@/store/slices/country/selectors';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countryList = resource.read();

  const countries = useSelector(selectCountry);
  const searchTerm = useSelector(selectSearchTerm);

  const { setCountries, setYears } = useActions();

  const filteredCountryList = useMemo(() => {
    return countryList.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countryList, searchTerm]);

  const years = [
    ...new Set(
      countries.flatMap(country => country.data.map(data => data.year))
    ),
  ];

  useEffect(() => {
    setCountries(filteredCountryList);
    setYears(years);
  }, [filteredCountryList, setCountries]);

  console.log(countries);

  return <CountryList />;
};
