import { createBrowserRouter } from 'react-router-dom';
import { PagePath } from './enums';
import { AboutPage } from '@/pages/about-page/AboutPage';
import { Root } from './root/root';
import { MainPage } from '@/pages/main-page/MainPage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import { BookDetailPage } from '@/pages/book-detail-page/BookDetailPage';

export const routes = [
  {
    path: PagePath.root,
    Component: Root,
    children: [
      { index: true, Component: MainPage },
      { path: PagePath.aboutPage, Component: AboutPage },
      { path: PagePath.notFound, Component: NotFoundPage },
      {
        path: PagePath.mainPage,
        Component: MainPage,
        children: [
          {
            path: PagePath.bookDetailPage,
            Component: BookDetailPage,
          },
        ],
      },
    ],
  },
  {
    path: PagePath.notFound,
    Component: NotFoundPage,
  },
];

export const router = createBrowserRouter(routes);
