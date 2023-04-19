import { httpClient } from '../config/httpClient';

const url = '';

export function getAllReviews() {
  return httpClient.get(url).then((res) => res.data.data);
}
