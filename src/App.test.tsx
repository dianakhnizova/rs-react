import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, it } from 'vitest';
import { routes } from './router/router';

describe('App routing', () => {
  it('renders MainPage on default route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('renders AboutPage on /about route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/about'],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
