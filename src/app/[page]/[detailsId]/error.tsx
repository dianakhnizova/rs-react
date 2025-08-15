'use client';

import { useState } from 'react';
import { Popup } from '@/components/popup/Popup';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    reset();
  };

  return (
    <Popup
      isOpen={isOpen}
      isError
      error={getErrorMessage(error)}
      onClose={handleClose}
    />
  );
}
