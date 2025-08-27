import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const countryList = resource.read();

  return <CountryList countries={countryList} />;
};
