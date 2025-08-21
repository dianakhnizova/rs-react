import type { Variant } from './enums';

export interface UserForm {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
}

export interface InputFields {
  htmlFor: string;
  label: string;
  type: string;
  placeholder?: string;
  variant?: Variant;
  className?: string;
  isGender?: boolean;
  ref?: React.RefObject<HTMLInputElement | null>;
  maleRef?: React.RefObject<HTMLInputElement | null>;
  femaleRef?: React.RefObject<HTMLInputElement | null>;
}
