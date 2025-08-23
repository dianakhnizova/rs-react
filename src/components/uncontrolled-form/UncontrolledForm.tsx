import styles from './UncontrolledForm.module.scss';
import { InputForm } from '../input-form/InputForm';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { getUserData } from '@/utils/getUserData';
import { Form } from '../form/Form';
import { ZodError } from 'zod';
import { userSchema } from '@/schemas/userSchema';
import { useState } from 'react';
import { useActions } from '@/utils/hooks/useActions';

export const UncontrolledForm = () => {
  const { inputFields, refs } = useInputFields();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});
  const { addUserData } = useActions();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = await getUserData(refs);

    try {
      const validatedData = userSchema.parse(userData);
      console.log(validatedData);

      addUserData(validatedData);
      setErrorMessage({});
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};

        error.issues.forEach(err => {
          const path = err.path[0];

          fieldErrors[path as string] = err.message;
        });

        setErrorMessage(fieldErrors);
      }
    }

    console.log(userData);
  };

  return (
    <Form onSubmit={onSubmit}>
      {inputFields.map((field, index) => (
        <div key={index} className={styles.container}>
          <InputForm {...field} />

          {errorMessage[field.name] && (
            <span className={styles.error}>{errorMessage[field.name]}</span>
          )}
        </div>
      ))}
    </Form>
  );
};
