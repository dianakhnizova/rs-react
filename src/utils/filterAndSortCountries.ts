import { SortOrder } from '@/sources/enums';
import { CountryData } from '@/sources/interfaces';

export const filterAndSortCountries = (
  countries: CountryData[],
  searchTerm: string,
  sortOrder: SortOrder | null,
  selectedYear: number | null
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
        const dataA = selectedYear
          ? a.data.find(d => d.year === selectedYear)
          : a.data.at(-1);
        const dataB = selectedYear
          ? b.data.find(d => d.year === selectedYear)
          : b.data.at(-1);

        const popA =
          dataA?.population &&
          !Number.isNaN(Number.parseFloat(dataA.population))
            ? Number.parseFloat(dataA.population)
            : null;
        const popB =
          dataB?.population &&
          !Number.isNaN(Number.parseFloat(dataB.population))
            ? Number.parseFloat(dataB.population)
            : null;

        if (popA === null && popB === null) return 0;
        if (popA === null) return -1;
        if (popB === null) return 1;

        return popA - popB;
      });
      break;
    }
    case SortOrder.POPULATION_DESC: {
      result = [...result].sort((a, b) => {
        const dataA = selectedYear
          ? a.data.find(d => d.year === selectedYear)
          : a.data.at(-1);
        const dataB = selectedYear
          ? b.data.find(d => d.year === selectedYear)
          : b.data.at(-1);

        const popA =
          dataA?.population &&
          !Number.isNaN(Number.parseFloat(dataA.population))
            ? Number.parseFloat(dataA.population)
            : null;
        const popB =
          dataB?.population &&
          !Number.isNaN(Number.parseFloat(dataB.population))
            ? Number.parseFloat(dataB.population)
            : null;

        if (popA === null && popB === null) return 0;
        if (popA === null) return 1;
        if (popB === null) return -1;

        return popB - popA;
      });

      break;
    }
  }

  return result;
};
