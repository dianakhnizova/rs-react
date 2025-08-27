import { DATA_URL, MISSING_VALUE } from '@/sources/constants';
import type { CountryData } from '@/sources/interfaces';

export const co2DataService = {
  getCo2DataList: async () => {
    const response = await fetch(DATA_URL);

    const text = await response.text();

    const data = JSON.parse(text);

    const countryList: CountryData[] = Object.keys(data).map(countryName => ({
      name: countryName,
      iso_code: data[countryName].iso_code ?? MISSING_VALUE,
      data: data[countryName].data,
    }));

    return countryList;
  },
};
