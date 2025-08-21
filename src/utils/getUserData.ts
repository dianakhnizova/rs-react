import type { useFormRefs } from './hooks/useFormRefs';

export const getUserData = (refs: ReturnType<typeof useFormRefs>) => {
  return {
    name: refs.nameRef.current?.value || '',
    age: refs.ageRef.current?.value || '',
    email: refs.emailRef.current?.value || '',
    password: refs.passwordRef.current?.value || '',
    confirmPassword: refs.confirmPasswordRef.current?.value || '',
    gender: refs.genderMaleRef.current?.checked
      ? 'male'
      : refs.genderFemaleRef.current?.checked,
    acceptTerm: refs.acceptTermsRef.current?.checked || false,
    country: refs.countryRef.current?.value || '',
    image: refs.imageRef.current?.files || undefined,
  };
};
