'use client';

import { downloadBooksCsv } from '@/utils/downloadBooksCsv';
import { useRef } from 'react';
import { Button } from '../button/Button';
import { messages } from './messages';
import { selectCart } from '@/store/slices/cart/selectors';
import { useAppSelector } from '@/utils/hooks/useAppSelector';

export const DownloadBooksButton = () => {
  const cart = useAppSelector(selectCart);
  const link = useRef<HTMLAnchorElement>(null);

  const handleDownloadButton = () => {
    downloadBooksCsv(cart, link);
  };

  return (
    <>
      <Button onClick={handleDownloadButton}>
        {messages.titleDownloadButton}
      </Button>

      <a ref={link} style={{ display: 'none' }} />
    </>
  );
};
