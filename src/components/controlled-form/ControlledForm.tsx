import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import type { FullUserForm, InputFields, UserForm } from '@/sources/interfaces';
import { useInputFields } from '@/utils/hooks/useInputFields';
import { InputForm } from '../input-form/InputForm';
import { Form } from '../form/Form';
import { userSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActions } from '@/utils/hooks/useActions';
import { fileToBase64 } from '@/utils/fileToBase64';
import type { FC } from 'react';
import { useEffect } from 'react';
import { InputType, HTML_FOR } from '@/sources/enums';
import { getPasswordStrength } from '@/utils/getPasswordStrength';

interface Props {
  onSuccess?: () => void;
}

export const ControlledForm: FC<Props> = ({ onSuccess }) => {
  const { register, handleSubmit, watch, trigger, formState } =
    useForm<FullUserForm>({
      resolver: zodResolver(userSchema),
      mode: 'onChange',
    });

  const { inputFields } = useInputFields();
  const { addUserData } = useActions();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    const fileBase64 = await fileToBase64(data.file[0]);

    const formData: FullUserForm = {
      ...data,
      file: fileBase64,
    };

    addUserData(formData);

    if (onSuccess) onSuccess();
  };

  const password = watch(InputType.PASSWORD);
  const strength = getPasswordStrength(password || '');

  useEffect(() => {
    if (password) {
      void trigger(HTML_FOR.CONFIRM_PASSWORD);
    }
  }, [password, trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} isDisabled={!formState.isValid}>
      {inputFields.map(field => (
        <InputForm
          key={field.name}
          {...field}
          register={register}
          passwordStrength={strength}
          errorMessage={
            formState.errors[field.name] &&
            formState.errors[field.name]?.message
          }
          autocomplete={
            field.name === InputType.EMAIL
              ? InputType.EMAIL
              : field.name === InputType.PASSWORD
                ? InputType.PASSWORD
                : field.name === HTML_FOR.CONFIRM_PASSWORD
                  ? HTML_FOR.CONFIRM_PASSWORD
                  : undefined
          }
          {...(register ? register(field.name as keyof UserForm) : {})}
        />
      ))}
    </Form>
  );
};
