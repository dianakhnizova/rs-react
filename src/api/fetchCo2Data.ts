import { DATA_URL, MISSING_VALUE } from '@/sources/constants';
import { ResourceStatus } from '@/sources/enums';
import type { CountryData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';
import { RawCo2Data } from '@/sources/types';

export const createCo2Data = () => {
  let status = ResourceStatus.PENDING;
  let result: CountryData[] | Error;

  const promise = (async () => {
    try {
      const response = await fetch(DATA_URL);

      const rawData = (await response.json()) as RawCo2Data;

      const data: CountryData[] = Object.keys(rawData).map(countryName => ({
        name: countryName,
        iso_code: rawData[countryName].iso_code ?? MISSING_VALUE,
        data: rawData[countryName].data,
      }));

      status = ResourceStatus.SUCCESS;
      result = data;
    } catch (error) {
      status = ResourceStatus.ERROR;
      result =
        error instanceof Error ? error : new Error(messages.error.unknown);
    }
  })();

  return {
    read(): CountryData[] {
      if (status === ResourceStatus.PENDING) throw promise;
      if (status === ResourceStatus.ERROR) throw result;
      return result as CountryData[];
    },
  };
};
