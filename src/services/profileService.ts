import { httpClient } from '../config/httpClient';

export function addBankDetails(data: any) {
  return httpClient.post('', data);
}

export function addWarehouse(data: any) {
  return httpClient.post('', data);
}
