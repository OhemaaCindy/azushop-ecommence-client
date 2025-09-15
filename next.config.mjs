/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow all hostnames
      },
      {
        protocol: 'http',
        hostname: '**', // allow http as well (if needed)
      },
    ],
  },
};

export default nextConfig;