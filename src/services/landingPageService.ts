import { httpClient } from '../config/httpClient';

export function getLandingPageData() {
  return httpClient.get('/seller/home').then((res) => res.data);
}
