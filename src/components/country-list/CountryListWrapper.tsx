import { createCo2Data } from '@/api/fetchCo2Data';
import { CountryList } from './CountryList';

const resource = createCo2Data();

export const CountryListWrapper = () => {
  const data = resource.read();
  return <CountryList countries={data} />;
};
