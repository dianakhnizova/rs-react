import styles from './UncontrolledForm.module.scss';
import { InputForm } from '../input-form/InputForm';
import { Button } from '../button/Button';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { messages } from '@/sources/messages';
import { getUserData } from '@/utils/getUserData';

export const UncontrolledForm = () => {
  const { inputFields, refs } = useInputFields();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = getUserData(refs);

    console.log(userData);
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.container}>
        {inputFields.map((field, index) => (
          <InputForm key={index} {...field} />
        ))}
      </div>

      <Button>{messages.button.submitButton}</Button>
    </form>
  );
};
