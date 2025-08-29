import { useSelector } from 'react-redux';
import { selectYears } from '@/store/slices/year/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { Select } from '@/components/select/Select';

export const SelectYear = () => {
  const years = useSelector(selectYears);
  const { setSelectedYear } = useActions();

  const lastYear = years.at(-1) ?? null;

  return (
    <Select
      options={years}
      setSelectedValue={value => setSelectedYear(value ? Number(value) : null)}
      defaultValue={lastYear}
    />
  );
};
