/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', 
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    globalNotFound: true,
  },
}
 
export default nextConfig