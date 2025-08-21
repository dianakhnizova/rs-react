import type { TypeRootState } from '@/store/store';

export const selectCountry = (state: TypeRootState) => state.country.countries;
