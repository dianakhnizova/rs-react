'use client';

import { useRef } from 'react';
import { Button } from '../button/Button';
import { messages } from './messages';
import { selectCart } from '@/store/slices/cart/selectors';
import { useAppSelector } from '@/utils/hooks/useAppSelector';

export const DownloadBooksButton = () => {
  const cart = useAppSelector(selectCart);
  const link = useRef<HTMLAnchorElement>(null);

  const handleDownloadButton = async () => {
    if (cart.length === 0) return;

    const selectBook = cart.map(book => book.id).join(',');
    const response = await fetch(`/api/books/csv?selectBook=${selectBook}`);

    if (!response.ok) return;

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const fileName = `${cart.length}`;

    if (link.current) {
      link.current.href = url;
      link.current.download = `${fileName}_items.csv`;
      link.current.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Button onClick={() => void handleDownloadButton()}>
        {messages.titleDownloadButton}
      </Button>

      <a ref={link} style={{ display: 'none' }} />
    </>
  );
};
