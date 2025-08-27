import { ResourceStatus } from './enums';

export interface Data {
  year: number;
  population?: string;
  cement_co2: number;
  cement_co2_per_capita?: number;
}

export interface CountryData {
  name: string;
  iso_code: string;
  data: Data[];
}

export interface RawCo2Data {
  [countryName: string]: {
    iso_code?: string;
    data: Data[];
  };
}

export interface PendingState {
  status: ResourceStatus.PENDING;
  promise: Promise<void>;
}

export interface SuccessState {
  status: ResourceStatus.SUCCESS;
  data: CountryData[];
}

export interface ErrorState {
  status: ResourceStatus.ERROR;
  error: Error;
}
