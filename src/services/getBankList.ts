import { httpClient } from '../config/httpClient';

const url = '/list-banks';

export function getBankList() {
  return httpClient.get(url).then((res) => res?.data?.data);
}
