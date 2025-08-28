import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';
import { useSelector } from 'react-redux';
import { selectCountry } from '@/store/slices/country/selectors';
import { useActions } from '@/utils/hooks/useActions';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countries = useSelector(selectCountry);
  const { setCountries } = useActions();

  const countryList = resource.read();

  if (countries.length === 0) {
    setCountries(countryList);
  }

  return <CountryList />;
};
