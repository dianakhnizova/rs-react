import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';
import { useActions } from '@/utils/hooks/useActions';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const searchTerm = useSelector(selectSearchTerm);
  const { setCountries } = useActions();

  const countryList = resource.read();

  const filteredCountryList = useMemo(() => {
    return countryList.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countryList, searchTerm]);

  useEffect(() => {
    setCountries(filteredCountryList);
  }, [filteredCountryList, setCountries]);

  return <CountryList />;
};
