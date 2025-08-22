import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { InputFields } from '@/sources/interfaces';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { InputForm } from '../input-form/InputForm';
import { Form } from '../form/Form';

const onSubmit: SubmitHandler<InputFields> = data => {
  console.log('Controlled form data:', data);
};

export const ControlledForm = () => {
  const { register, handleSubmit } = useForm<InputFields>();
  const { inputFields } = useInputFields();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {inputFields.map((field, index) => (
        <InputForm key={index} {...field} register={register} />
      ))}
    </Form>
  );
};
