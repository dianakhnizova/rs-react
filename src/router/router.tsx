import { createBrowserRouter } from 'react-router-dom';
import { PagePath } from './enums';
import { AboutPage } from '@/pages/about-page/AboutPage';
import { Root } from './root/root';
import { MainPage } from '@/pages/main-page/MainPage';

export const routes = [
  {
    path: PagePath.root,
    Component: Root,
    children: [
      { index: true, Component: MainPage },
      { path: PagePath.aboutPage, Component: AboutPage },
    ],
  },
  {
    path: PagePath.notFound,
    Component: MainPage,
  },
];

export const router = createBrowserRouter(routes);
