import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['covers.openlibrary.org'],
  },
  sassOptions: {
    includePaths: ['./src/app/[locale]/styles'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
