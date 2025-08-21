import { useRef } from 'react';

export function useFormRefs() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);

  return {
    nameRef,
    ageRef,
    emailRef,
    passwordRef,
    confirmPasswordRef,
    acceptTermsRef,
    countryRef,
    imageRef,
    genderFemaleRef,
    genderMaleRef,
  };
}
