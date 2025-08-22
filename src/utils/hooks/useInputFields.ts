import { useFormRefs } from './useFormRefs';
import styles from '@/components/uncontrolled-form/UncontrolledForm.module.scss';
import { messages } from '@/sources/messages';
import { HTML_FOR, InputType, List, Variant } from '@/sources/enums';
import type { InputFields } from '@/sources/interfaces';
import { useSelector } from 'react-redux';
import { selectCountry } from '@/store/slices/country/selectors';
import { fileToBase64 } from '../fileToBase64';
import { useActions } from './useActions';

export const useInputFields = () => {
  const refs = useFormRefs();
  const countries = useSelector(selectCountry);
  const { setImage } = useActions();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await fileToBase64(file);
      setImage(base64);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const inputFields: InputFields[] = [
    {
      htmlFor: HTML_FOR.NAME,
      label: messages.label.name,
      name: HTML_FOR.NAME,
      type: InputType.TEXT,
      placeholder: messages.placeholder.name,
      ref: refs.nameRef,
    },
    {
      htmlFor: HTML_FOR.AGE,
      label: messages.label.age,
      name: HTML_FOR.AGE,
      type: InputType.NUMBER,
      placeholder: messages.placeholder.age,
      ref: refs.ageRef,
    },
    {
      htmlFor: InputType.EMAIL,
      label: messages.label.email,
      name: InputType.EMAIL,
      type: InputType.EMAIL,
      placeholder: messages.placeholder.email,
      ref: refs.emailRef,
    },
    {
      htmlFor: InputType.PASSWORD,
      label: messages.label.password,
      name: InputType.PASSWORD,
      type: InputType.PASSWORD,
      placeholder: messages.placeholder.password,
      ref: refs.passwordRef,
    },
    {
      htmlFor: HTML_FOR.CONFIRM_PASSWORD,
      label: messages.label.confirmPassword,
      name: HTML_FOR.CONFIRM_PASSWORD,
      type: InputType.PASSWORD,
      placeholder: messages.placeholder.confirm,
      ref: refs.confirmPasswordRef,
    },
    {
      htmlFor: HTML_FOR.GENDER,
      label: messages.label.gender,
      name: HTML_FOR.GENDER,
      type: InputType.RADIO,
      variant: Variant.SECONDARY,
      className: styles.gender,
      isGender: true,
      maleRef: refs.genderMaleRef,
      femaleRef: refs.genderFemaleRef,
    },
    {
      htmlFor: HTML_FOR.ACCEPT_TERMS,
      label: messages.label.acceptTerms,
      name: HTML_FOR.ACCEPT_TERMS,
      type: InputType.CHECKBOX,
      ref: refs.acceptTermsRef,
      variant: Variant.SECONDARY,
      className: styles.accept,
    },
    {
      htmlFor: InputType.FILE,
      label: messages.label.photo,
      name: InputType.FILE,
      type: InputType.FILE,
      ref: refs.imageRef,
      onChange: handleImageChange,
      className: styles.file,
    },
    {
      htmlFor: HTML_FOR.COUNTRY,
      label: messages.label.country,
      name: HTML_FOR.COUNTRY,
      type: InputType.TEXT,
      isDataList: true,
      list: List.COUNTRY_LIST,
      countries,
      ref: refs.countryRef,
      className: styles.country,
    },
  ];

  return { inputFields, refs };
};
