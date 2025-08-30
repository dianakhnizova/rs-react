import { MISSING_VALUE } from '@/sources/constants';
import { Data } from '@/sources/interfaces';

export function extractYearDataValues(
  yearData: Data | undefined,
  selectedColumnKeys: string[]
) {
  return selectedColumnKeys.map(
    key => yearData?.[key as keyof Data] ?? MISSING_VALUE
  );
}
