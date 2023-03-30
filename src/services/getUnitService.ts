import { httpClient } from '../config/httpClient';

export function getUnits() {
  return httpClient.get('/get-units').then((res) => res.data.data);
}
