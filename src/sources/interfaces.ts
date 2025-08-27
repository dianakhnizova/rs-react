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
