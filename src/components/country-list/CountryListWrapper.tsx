import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';
import { useActions } from '@/utils/hooks/useActions';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchTerm } from '@/store/slices/search-term/selectors';
import { selectSelectedSortOrder } from '@/store/slices/sort/selectors';
import { filterAndSortCountries } from '@/utils/filterAndSortCountries';
import { getUniqueYears } from '@/utils/getUniqueYears';
import { selectSelectedYear } from '@/store/slices/year/selectors';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countryList = resource.read();

  const searchTerm = useSelector(selectSearchTerm);
  const sortOrder = useSelector(selectSelectedSortOrder);
  const selectedYear = useSelector(selectSelectedYear);
  const { setYears } = useActions();

  const displayCountries = useMemo(() => {
    return filterAndSortCountries(
      countryList,
      searchTerm,
      sortOrder,
      selectedYear
    );
  }, [countryList, searchTerm, sortOrder, selectedYear]);

  const years = useMemo(() => getUniqueYears(countryList), [countryList]);

  useEffect(() => {
    setYears(years);
  }, [setYears, years]);

  return <CountryList countries={displayCountries} />;
};
