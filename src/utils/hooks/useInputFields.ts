import { useFormRefs } from './useFormRefs';
import styles from '@/components/uncontrolled-form/UncontrolledForm.module.scss';
import { messages } from '@/sources/messages';
import { HTML_FOR, InputType, Variant } from '@/sources/enums';
import type { InputFields } from '@/sources/interfaces';

export const useInputFields = () => {
  const refs = useFormRefs();

  const inputFields: InputFields[] = [
    {
      htmlFor: InputType.TEXT,
      label: messages.label.name,
      type: InputType.TEXT,
      placeholder: messages.placeholder.name,
      ref: refs.nameRef,
    },
    {
      htmlFor: InputType.NUMBER,
      label: messages.label.age,
      type: InputType.NUMBER,
      placeholder: messages.placeholder.age,
      ref: refs.ageRef,
    },
    {
      htmlFor: InputType.EMAIL,
      label: messages.label.email,
      type: InputType.EMAIL,
      placeholder: messages.placeholder.email,
      ref: refs.emailRef,
    },
    {
      htmlFor: InputType.PASSWORD,
      label: messages.label.password,
      type: InputType.PASSWORD,
      placeholder: messages.placeholder.password,
      ref: refs.passwordRef,
    },
    {
      htmlFor: HTML_FOR.CONFIRM_PASSWORD,
      label: messages.label.confirmPassword,
      type: InputType.PASSWORD,
      placeholder: messages.placeholder.confirm,
      ref: refs.confirmPasswordRef,
    },
    {
      htmlFor: InputType.RADIO,
      label: messages.label.gender,
      type: InputType.RADIO,
      variant: Variant.SECONDARY,
      className: styles.gender,
      isGender: true,
      maleRef: refs.genderMaleRef,
      femaleRef: refs.genderFemaleRef,
    },
    {
      htmlFor: InputType.CHECKBOX,
      label: messages.label.acceptTerms,
      type: InputType.CHECKBOX,
      ref: refs.acceptTermsRef,
      variant: Variant.SECONDARY,
      className: styles.accept,
    },
    {
      htmlFor: InputType.FILE,
      label: messages.label.photo,
      type: InputType.FILE,
      ref: refs.imageRef,
    },
    {
      htmlFor: HTML_FOR.COUNTRY,
      label: messages.label.country,
      type: InputType.TEXT,
      ref: refs.countryRef,
      className: styles.country,
    },
  ];

  return { inputFields, refs };
};
