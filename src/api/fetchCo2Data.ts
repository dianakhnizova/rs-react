import { co2DataService } from './services/co2DataService';

export const fetchCo2Data = async () => {
  const co2Data = await co2DataService.getCo2DataList();

  return co2Data;
};
