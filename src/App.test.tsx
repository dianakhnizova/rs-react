import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it } from 'vitest';
import { routes } from './router/router';
import { ThemeProvider } from './utils/ThemeContext';
import { Provider } from 'react-redux';
import { store } from './store/store';

describe('App routing', () => {
  it('renders MainPage on default route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('renders AboutPage on /about route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/about'],
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
