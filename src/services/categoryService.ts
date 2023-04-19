import { httpClient } from '../config/httpClient';

export function searchCategory(keyword: string) {
  return httpClient
    .get(`/category/search?name=${keyword}`)
    .then((res) => res.data.data);
}
