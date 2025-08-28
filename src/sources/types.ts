import { ErrorState, PendingState, SuccessState } from './interfaces';

export type Co2DataState = PendingState | SuccessState | ErrorState;

export type ColumnPicker = {
  id: string;
  htmlFor: string;
  label: string;
  type: string;
  key: string;
};

export type SelectedColumn = {
  key: string;
  label: string;
};
