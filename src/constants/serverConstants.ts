export const imageServerBaseUrl =
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ??
  'https://devdashboard.hajurbuwa.com/hajurbuwa-bucket/';

export const storefrontBaseUrl =
  process.env.NEXT_PUBLIC_STOREFRONT_URL?.trim() ||
  'https://www.hajurbuwa.com';

export const getRetailerProductUrl = (productId: string) =>
  `${storefrontBaseUrl.replace(/\/+$/, '')}/product?productId=${encodeURIComponent(productId)}`;

/** Join bucket base URL with a relative image path (avoids double slashes). */
export function resolveImageUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

  const base = imageServerBaseUrl.replace(/\/+$/, '');
  const normalized = path.replace(/^\/+/, '');
  return `${base}/${normalized}`;
}
