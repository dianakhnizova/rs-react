import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    String.raw`/((?!api|trpc|_next|_vercel|.*\.(?:css|js|gif|png|jpg|svg|ico)).*)`,
  ],
};
