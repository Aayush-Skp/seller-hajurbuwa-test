import { httpClient } from '../config/httpClient';

export function getBrands() {
  return httpClient.get('/get-brands').then((res) => res.data.data);
}
