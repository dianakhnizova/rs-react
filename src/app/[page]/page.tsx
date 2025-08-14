'use client';

import { BooksSection } from '@/pages/main-page/components/books-section/BooksSection';
import { makeStore } from '@/store/store';
import React from 'react';
import { Provider } from 'react-redux';

export default function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = React.use(params);
  const initialPage = Number(page) || 1;
  const store = makeStore(initialPage);

  return (
    <Provider store={store}>
      <BooksSection />
    </Provider>
  );
}
