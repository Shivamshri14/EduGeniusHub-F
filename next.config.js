/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/product/turnitin-plag', destination: '/product/edugenius-similarity-report', permanent: true },
      { source: '/product/turnitin-ai', destination: '/product/edugenius-ai-writing-check', permanent: true },
      { source: '/product/turnitin-combo', destination: '/product/edugenius-combo-report', permanent: true },
    ];
  },
};

module.exports = nextConfig;
