import { useSelector } from 'react-redux';
import { selectYears } from '@/store/slices/year/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { Select } from '@/components/select/Select';
import { memo, useCallback, useMemo } from 'react';

export const SelectYear = memo(() => {
  const years = useSelector(selectYears);
  const { setSelectedYear } = useActions();

  const reversedYears = useMemo(() => [...years].reverse(), [years]);

  const handleSelect = useCallback(
    (value: string | null) => setSelectedYear(Number(value)),
    [setSelectedYear]
  );

  return <Select options={reversedYears} setSelectedValue={handleSelect} />;
});
