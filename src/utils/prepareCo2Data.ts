import { MISSING_VALUE } from '@/sources/constants';
import { CountryData, RawCo2Data } from '@/sources/interfaces';

export const prepareCo2Data = (rawData: RawCo2Data) => {
  const countryList: CountryData[] = Object.keys(rawData).map(countryName => ({
    name: countryName,
    iso_code: rawData[countryName].iso_code ?? MISSING_VALUE,
    data: rawData[countryName].data,
  }));

  return countryList;
};
