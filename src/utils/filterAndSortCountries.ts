import { SortOrder } from '@/sources/enums';
import { CountryData } from '@/sources/interfaces';

export const filterAndSortCountries = (
  countries: CountryData[],
  searchTerm: string,
  sortOrder: SortOrder | null
) => {
  let result = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  switch (sortOrder) {
    case SortOrder.NAME_ASC: {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
      break;
    }
    case SortOrder.NAME_DESC: {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
      break;
    }
    case SortOrder.POPULATION_ASC: {
      result = [...result].sort((a, b) => {
        const aPop = Number(a.data.at(-1)?.population ?? 0);
        const bPop = Number(b.data.at(-1)?.population ?? 0);

        if (aPop == null && bPop == null) return 0;
        if (aPop == null) return 1;
        if (bPop == null) return -1;

        return aPop - bPop;
      });
      break;
    }
    case SortOrder.POPULATION_DESC: {
      result = [...result].sort((a, b) => {
        const aPop = Number(a.data.at(-1)?.population ?? 0);
        const bPop = Number(b.data.at(-1)?.population ?? 0);

        if (aPop == null && bPop == null) return 0;
        if (aPop == null) return 1;
        if (bPop == null) return -1;

        return bPop - aPop;
      });
      break;
    }
  }

  return result;
};
