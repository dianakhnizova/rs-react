import {
  BASE_HIGHLIGHT_COLUMNS,
  NO_HIGHLIGHT_COLUMNS,
} from '@/sources/constants';

export const getHighlightIndex = (additionalColumnsLength: number) => {
  return Array.from(
    { length: BASE_HIGHLIGHT_COLUMNS + additionalColumnsLength },
    (_, i) => i
  ).slice(NO_HIGHLIGHT_COLUMNS);
};
