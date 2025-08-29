import { useSelector } from 'react-redux';
import { selectYears } from '@/store/slices/year/selectors';
import { useActions } from '@/utils/hooks/useActions';
import { Select } from '@/components/select/Select';
import { messages } from '@/sources/messages';

export const SelectYear = () => {
  const years = useSelector(selectYears);
  const { setSelectedYear } = useActions();

  return (
    <Select
      options={years}
      setSelectedValue={value => setSelectedYear(value ? Number(value) : null)}
      defaultValue={messages.select}
    />
  );
};
