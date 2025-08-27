import { Data } from './interfaces';

export type RawCo2Data = Record<string, { iso_code?: string; data: Data[] }>;
