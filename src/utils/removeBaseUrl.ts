function removeBaseUrl(url: string): string {
  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    'https://dashboard.hajurbuwa.com/api';

  if (url.startsWith(apiBase)) {
    const path = url.slice(apiBase.length);
    return path.startsWith('/') ? path : `/${path}`;
  }

  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/^\/api/, '') + parsed.search;
    return path.startsWith('/') ? path : `/${path}`;
  } catch {
    return url;
  }
}

export default removeBaseUrl;
