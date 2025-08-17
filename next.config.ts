import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['covers.openlibrary.org'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
