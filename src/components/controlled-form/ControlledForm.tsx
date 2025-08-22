import styles from './ControlledForm.module.scss';
import { Button } from '../button/Button';
import { messages } from '@/sources/messages';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { InputFields } from '@/sources/interfaces';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { InputForm } from '../input-form/InputForm';

const onSubmit: SubmitHandler<InputFields> = data => {
  console.log('Controlled form data:', data);
};

export const ControlledForm = () => {
  const { register, handleSubmit } = useForm<InputFields>();
  const { inputFields } = useInputFields();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.container}>
        {inputFields.map((field, index) => (
          <InputForm key={index} {...field} register={register} />
        ))}
      </div>

      <Button type="submit">{messages.button.submitButton}</Button>
    </form>
  );
};
