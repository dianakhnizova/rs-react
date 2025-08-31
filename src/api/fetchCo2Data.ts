import { ResourceStatus } from '@/sources/enums';
import type { CountryData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';
import { co2DataService } from './services/co2DataService';
import { prepareCo2Data } from '@/utils/prepareCo2Data';
import { Co2DataState } from '@/sources/types';

export const createCo2Data = () => {
  let state: Co2DataState = {
    status: ResourceStatus.PENDING,
    promise: (async () => {
      try {
        const countryList = await co2DataService.getCo2DataList();
        state = {
          status: ResourceStatus.SUCCESS,
          data: prepareCo2Data(countryList),
        };
      } catch (error) {
        state = {
          status: ResourceStatus.ERROR,
          error:
            error instanceof Error ? error : new Error(messages.error.unknown),
        };
      }
    })(),
  };

  return {
    read(): CountryData[] {
      switch (state.status) {
        case ResourceStatus.PENDING: {
          throw state.promise;
        }
        case ResourceStatus.ERROR: {
          throw state.error;
        }
        case ResourceStatus.SUCCESS: {
          return state.data;
        }
      }
    },
  };
};
