/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://sell.hajurbuwa.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  outDir: 'public',
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
}