import { Select } from '@/components/select/Select';
import { messages } from '@/sources/messages';
import { useActions } from '@/utils/hooks/useActions';
import { InputType, SortOrder } from '@/sources/enums';
import { useState } from 'react';
import { Input } from '@/components/input/Input';

export const Sort = () => {
  const { setSortOrder } = useActions();
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [direction, setDirection] = useState<
    SortOrder.ASC | SortOrder.DESC | null
  >(null);

  const options = [messages.sort.sortByPopulation, messages.sort.sortByName];

  const onSelectSort = (value: string | null) => {
    setSelectedField(value);
    setDirection(null);
  };

  const onDirectionChange = (direction: SortOrder.ASC | SortOrder.DESC) => {
    setDirection(direction);

    if (selectedField === messages.sort.sortByName) {
      setSortOrder(
        direction === SortOrder.ASC ? SortOrder.NAME_ASC : SortOrder.NAME_DESC
      );
    }
    if (selectedField === messages.sort.sortByPopulation) {
      setSortOrder(
        direction === SortOrder.ASC
          ? SortOrder.POPULATION_ASC
          : SortOrder.POPULATION_DESC
      );
    }
  };

  return (
    <>
      <Select
        defaultValue={messages.sort.sortBy}
        options={options}
        setSelectedValue={onSelectSort}
      />

      {selectedField && (
        <>
          <Input
            id={InputType.CHECKBOX}
            type={InputType.RADIO}
            isRadio
            checked={direction === SortOrder.ASC}
            onChange={() => onDirectionChange(SortOrder.ASC)}
            isLabel
            label={messages.sort.sortByAsc}
          />

          <Input
            id={InputType.CHECKBOX}
            type={InputType.RADIO}
            isRadio
            isCheckbox
            checked={direction === SortOrder.DESC}
            onChange={() => onDirectionChange(SortOrder.DESC)}
            isLabel
            label={messages.sort.sortByDesc}
          />
        </>
      )}
    </>
  );
};
