/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: 'https://sell.hajurbuwa.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  reactStrictMode: true,
  swcMinify: true,
  sourceDir: '.next',
  outDir: 'public',
  images: {
    domains: [
      'www.fjallraven.com',
      'hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com',
      'dipencompany.com',
      'hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.comproducts',
    ],
  },
  // Add the next-sitemap configuration
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/rss',
        destination: '/api/rss',
        permanent: true,
      },
    ];
  },
  // Add your own dynamic pages to the sitemap
  async generateBuildId() {
    return 'build';
  },
  exclude: [
    '/api/*',
    '/admin/*',
    '/test/',
    '/update-business-details/',
    '/review-management/',
    '/product-management/',
    '/order-management/',
    '/finance/',
    '/404/',
    '/500',
    '/settings/',
    '/product',
    '/order',
  ],
};

module.exports = nextConfig;