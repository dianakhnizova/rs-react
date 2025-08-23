import { fileToBase64 } from './fileToBase64';
import type { useFormRefs } from './hooks/useFormRefs';

export const getUserData = async (refs: ReturnType<typeof useFormRefs>) => {
  const file = refs.imageRef.current?.files?.[0];
  const fileBase64 = file ? await fileToBase64(file) : undefined;

  return {
    name: refs.nameRef.current?.value || '',
    age: refs.ageRef.current?.value || '',
    email: refs.emailRef.current?.value || '',
    password: refs.passwordRef.current?.value || '',
    confirmPassword: refs.confirmPasswordRef.current?.value || '',
    gender: refs.genderMaleRef.current?.checked
      ? refs.genderMaleRef.current.value
      : refs.genderFemaleRef.current?.checked
        ? refs.genderFemaleRef.current.value
        : '',
    acceptTerms: refs.acceptTermsRef.current?.checked || false,
    country: refs.countryRef.current?.value || '',
    file: fileBase64,
  };
};
