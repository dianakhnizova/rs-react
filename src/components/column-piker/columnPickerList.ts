import { InputId, InputType } from '@/sources/enums';
import { messages } from '@/sources/messages';
import { ColumnPicker } from '@/sources/types';

export const columnPicker: ColumnPicker[] = [
  {
    id: InputId.ONE,
    htmlFor: InputId.ONE,
    label: messages.label.methane,
    type: InputType.CHECKBOX,
    key: messages.key.methane,
  },

  {
    id: InputId.TWO,
    htmlFor: InputId.TWO,
    label: messages.label.nitrous_oxide,
    type: InputType.CHECKBOX,
    key: messages.key.nitrous_oxide,
  },

  {
    id: InputId.THREE,
    htmlFor: InputId.THREE,
    label: messages.label.share_global_cumulative_luc_co2,
    type: InputType.CHECKBOX,
    key: messages.key.share_global_cumulative_luc_co2,
  },

  {
    id: InputId.FOUR,
    htmlFor: InputId.FOUR,
    label: messages.label.temperature_change_from_co2,
    type: InputType.CHECKBOX,
    key: messages.key.temperature_change_from_co2,
  },

  {
    id: InputId.FIVE,
    htmlFor: InputId.FIVE,
    label: messages.label.total_ghg,
    type: InputType.CHECKBOX,
    key: messages.key.total_ghg,
  },
];
