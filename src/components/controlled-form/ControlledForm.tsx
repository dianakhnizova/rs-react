import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { InputFields, UserForm } from '@/sources/interfaces';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { InputForm } from '../input-form/InputForm';
import { Form } from '../form/Form';
import { userSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const onSubmit: SubmitHandler<InputFields> = data => {
  console.log('Controlled form data:', data);
};

export const ControlledForm = () => {
  const { register, handleSubmit, formState } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });
  const { inputFields } = useInputFields();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} isDisabled={!formState.isValid}>
      {inputFields.map((field, index) => (
        <div key={index}>
          <InputForm
            {...field}
            register={register}
            {...(register ? register(field.name as keyof UserForm) : {})}
          />

          {formState.errors[field.name] && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {formState.errors[field.name]?.message}
            </span>
          )}
        </div>
      ))}
    </Form>
  );
};
