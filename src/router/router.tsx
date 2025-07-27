import { createBrowserRouter } from 'react-router-dom';
import { PagePath } from './enums';
import { AboutPage } from '@/pages/about-page/AboutPage';
import { Root } from './root/root';
import { MainPage } from '@/pages/main-page/MainPage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import { BookDetailSection } from '@/pages/book-detail-section/BookDetailSection';

export const routes = [
  {
    path: PagePath.root,
    Component: Root,
    children: [
      {
        index: true,
        Component: MainPage,
      },
      {
        path: ':page',
        Component: MainPage,
        children: [
          {
            path: ':detailsId',
            Component: BookDetailSection,
          },
        ],
      },
      { path: PagePath.aboutPage, Component: AboutPage },
    ],
  },
  {
    path: PagePath.notFound,
    Component: NotFoundPage,
  },
];

export const router = createBrowserRouter(routes);
