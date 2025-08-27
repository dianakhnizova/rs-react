import { DATA_URL } from '@/sources/constants';
import { RawCo2Data } from '@/sources/interfaces';

export const co2DataService = {
  getCo2DataList: async (): Promise<RawCo2Data> => {
    const response = await fetch(DATA_URL);

    const rawData = (await response.json()) as RawCo2Data;
    return rawData;
  },
};
