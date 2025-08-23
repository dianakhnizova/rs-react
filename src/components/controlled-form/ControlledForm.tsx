import styles from './ControlledForm.module.scss';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { InputFields, UserForm } from '@/sources/interfaces';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { InputForm } from '../input-form/InputForm';
import { Form } from '../form/Form';
import { userSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActions } from '@/utils/hooks/useActions';
import { fileToBase64 } from '@/utils/fileToBase64';

interface Props {
  onSuccess?: () => void;
}

export const ControlledForm: FC<Props> = ({ onSuccess }) => {
  const { register, handleSubmit, formState } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
  });

  const { inputFields } = useInputFields();
  const { addUserData } = useActions();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    const fileBase64 = await fileToBase64(data.file[0]);

    const formData: FullUserForm = {
      ...data,
      confirmPassword: data.password,
      file: fileBase64,
    };

    addUserData(formData);

    if (onSuccess) onSuccess();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} isDisabled={!formState.isValid}>
      {inputFields.map((field, index) => (
        <div key={index} className={styles.container}>
          <InputForm
            {...field}
            register={register}
            {...(register ? register(field.name as keyof UserForm) : {})}
          />

          {formState.errors[field.name] && (
            <span className={styles.error}>
              {formState.errors[field.name]?.message}
            </span>
          )}
        </div>
      ))}
    </Form>
  );
};
