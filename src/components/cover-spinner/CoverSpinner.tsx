import { messages } from './messages';
import CoverSpinnerPlaceholder from '@/assets/cover-spinner.gif';

interface Props {
  isImageLoading: boolean;
}

export const CoverSpinner = ({ isImageLoading }: Props) => {
  if (!isImageLoading) return;

  return (
    <>
      <img src={CoverSpinnerPlaceholder} alt={messages.altTitle} />
    </>
  );
};
