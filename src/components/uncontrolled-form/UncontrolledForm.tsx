import styles from './UncontrolledForm.module.scss';
import { InputForm } from '../input-form/InputForm';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { getUserData } from '@/utils/getUserData';
import { Form } from '../form/Form';
import { ZodError } from 'zod';
import { userSchema } from '@/schemas/userSchema';
import { useState } from 'react';
import type { UserForm } from '@/sources/interfaces';

export const UncontrolledForm = () => {
  const { inputFields, refs } = useInputFields();
  const [errorMessage, setErrorMessage] = useState<Record<string, string>>({});

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userData = getUserData(refs);

    try {
      const validatedData = userSchema.parse(userData);
      console.log(validatedData);

      setErrorMessage({});
    } catch (error) {
      if (error instanceof ZodError) {
        const zodError = error as ZodError<UserForm>;

        const fieldErrors: Record<string, string> = {};

        zodError.issues.forEach(err => {
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
