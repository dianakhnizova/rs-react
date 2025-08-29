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
import { SortOrder } from '@/sources/enums';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countryList = resource.read();

  const countries = useSelector(selectCountry);
  const searchTerm = useSelector(selectSearchTerm);
  const sortOrder = useSelector(selectSelectedSortOrder);
  const { setCountries, setYears } = useActions();

  const displayCountries = useMemo(() => {
    let result = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case SortOrder.NAME_ASC: {
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      }
      case SortOrder.NAME_DESC: {
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      }
      case SortOrder.POPULATION_ASC: {
        result = [...result].sort((a, b) => {
          const aPop = Number(a.data.at(-1)?.population ?? 0);
          const bPop = Number(b.data.at(-1)?.population ?? 0);
          return aPop - bPop;
        });
        break;
      }
      case SortOrder.POPULATION_DESC: {
        result = [...result].sort((a, b) => {
          const aPop = Number(a.data.at(-1)?.population ?? 0);
          const bPop = Number(b.data.at(-1)?.population ?? 0);
          return bPop - aPop;
        });
        break;
      }
    }

    return result;
  }, [countries, searchTerm, sortOrder]);

  const years = useMemo(
    () => [
      ...new Set(
        countries.flatMap(country => country.data.map(data => data.year))
      ),
    ],
    [countries]
  );

  useEffect(() => {
    setCountries(countryList);
    setYears(years);
  }, [countries, setCountries, setYears, years]);

  console.log(countries);

  return <CountryList countries={displayCountries} />;
};
