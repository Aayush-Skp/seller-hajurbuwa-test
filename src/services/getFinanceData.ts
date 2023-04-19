import { httpClient } from '../config/httpClient';

const url = '';

export function getFinanceData() {
  return httpClient.get(url).then((res) => res.data.data);
}
