/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'www.fjallraven.com',
      'hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com',
      'dipencompany.com',
    ],
  },
};

module.exports = nextConfig;
