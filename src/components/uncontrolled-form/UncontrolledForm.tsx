import { InputForm } from '../input-form/InputForm';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { getUserData } from '@/utils/getUserData';
import { Form } from '../form/Form';

export const UncontrolledForm = () => {
  const { inputFields, refs } = useInputFields();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = getUserData(refs);

    console.log(userData);
  };

  return (
    <Form onSubmit={onSubmit}>
      {inputFields.map((field, index) => (
        <InputForm key={index} {...field} />
      ))}
    </Form>
  );
};
