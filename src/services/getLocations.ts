import { httpClient } from '../config/httpClient';

export function getAllLocation() {
  return httpClient.get('/get-locations').then((res) => res?.data?.data);
}
