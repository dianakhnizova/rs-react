import { getUserData } from '@/utils/getUserData';
import styles from './UncontrolledForm.module.scss';
import { InputForm } from '../input-form/InputForm';
import { HTML_FOR, InputType, Variant } from '@/sources/enums';
import { messages } from '@/sources/messages';
import { useFormRefs } from '@/utils/hooks/useFormRefs';
import { Button } from '../button/Button';

export const UncontrolledForm = () => {
  const refs = useFormRefs();

  const onSubmit = () => {
    const userData = getUserData(refs);

    console.log(userData);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.container}>
        <InputForm
          htmlFor={InputType.TEXT}
          label={messages.label.name}
          type={InputType.TEXT}
          ref={refs.nameRef}
        />

        <InputForm
          htmlFor={InputType.NUMBER}
          label={messages.label.age}
          type={InputType.NUMBER}
          ref={refs.ageRef}
        />

        <InputForm
          htmlFor={InputType.EMAIL}
          label={messages.label.email}
          type={InputType.EMAIL}
          ref={refs.emailRef}
        />

        <InputForm
          htmlFor={InputType.PASSWORD}
          label={messages.label.password}
          type={InputType.PASSWORD}
          ref={refs.passwordRef}
        />

        <InputForm
          htmlFor={HTML_FOR.CONFIRM_PASSWORD}
          label={messages.label.confirmPassword}
          type={InputType.PASSWORD}
          ref={refs.confirmPasswordRef}
        />

        <InputForm
          htmlFor={InputType.RADIO}
          label={messages.label.gender}
          type={InputType.RADIO}
          ref={refs.genderFemaleRef}
          variant={Variant.SECONDARY}
          className={styles.gender}
        />

        <InputForm
          htmlFor={InputType.CHECKBOX}
          label={messages.label.acceptTerms}
          type={InputType.CHECKBOX}
          ref={refs.acceptTermsRef}
          variant={Variant.SECONDARY}
          className={styles.accept}
        />

        <InputForm
          htmlFor={InputType.FILE}
          label={messages.label.photo}
          type={InputType.FILE}
          ref={refs.imageRef}
        />

        <InputForm
          htmlFor={HTML_FOR.COUNTRY}
          label={messages.label.country}
          type={InputType.TEXT}
          ref={refs.countryRef}
          className={styles.country}
        />
      </div>

      <Button>{messages.button.submitButton}</Button>
    </form>
  );
};
