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

    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      setImage(base64);
    } catch (error: unknown) {
      console.error(error);
    }
  };

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
      onChange: handleImageChange,
      className: styles.file,
    },
    {
      htmlFor: HTML_FOR.COUNTRY,
      label: messages.label.country,
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
