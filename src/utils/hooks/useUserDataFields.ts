import { messages } from '@/sources/messages';
import { useSelector } from 'react-redux';
import { selectUser } from '@/store/slices/user/selectors';

export const useUserDataFields = () => {
  const userData = useSelector(selectUser);

  if (!userData || userData.length === 0) return [];

  return userData.map(user => [
    { label: messages.label.name, data: user.name },
    { label: messages.label.age, data: user.age },
    { label: messages.label.email, data: user.email },
    { label: messages.label.password, data: user.password },
    { label: messages.label.confirmPassword, data: user.confirmPassword },
    { label: messages.label.gender, data: user.gender },
    { label: messages.label.country, data: user.country },
    { label: messages.label.photo, data: user.file || '' },
    { label: messages.label.acceptTerms, data: user.acceptTerms ? 'Yes' : '' },
  ]);
};
