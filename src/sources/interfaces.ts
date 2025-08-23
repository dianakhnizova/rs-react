import type { Variant } from './enums';

export interface UserForm {
  name: string;
  age: string;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
}

export interface FullUserForm extends UserForm {
  confirmPassword: string;
  file: string;
}

export interface InputFields {
  htmlFor: string;
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  variant?: Variant;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isGender?: boolean;
  isDataList?: boolean;
  list?: string;
  countries?: Country[];
  ref?: React.RefObject<HTMLInputElement | null>;
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
}

export interface Country {
  id: string;
  name: string;
}
