import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';
import { useActions } from '@/utils/hooks/useActions';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';
import {
  selectCountry,
  selectSelectedSortOrder,
} from '@/store/slices/country/selectors';
import { filterAndSortCountries } from '@/utils/filterAndSortCountries';
import { getUniqueYears } from '@/utils/getUniqueYears';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countryList = resource.read();

  const countries = useSelector(selectCountry);
  const searchTerm = useSelector(selectSearchTerm);
  const sortOrder = useSelector(selectSelectedSortOrder);
  const { setCountries, setYears } = useActions();

  const displayCountries = useMemo(() => {
    return filterAndSortCountries(countries, searchTerm, sortOrder);
  }, [countries, searchTerm, sortOrder]);

  const years = useMemo(() => getUniqueYears(countries), [countries]);

  useEffect(() => {
    setCountries(countryList);
    setYears(years);
  }, [countries, setCountries, setYears, years]);

  return <CountryList countries={displayCountries} />;
};
