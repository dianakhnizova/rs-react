import { InputType } from '@/sources/enums';
import { Input } from '../input/Input';
import { messages } from '@/sources/messages';

export const Search = () => {
  return (
    <Input
      id={InputType.TEXT}
      type={InputType.TEXT}
      placeholder={messages.button.search}
      isSearch
    />
  );
};
