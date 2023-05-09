import { httpClient } from '../config/httpClient';

export function getFinanceDetails({ sellerId, start_date, end_date }: any) {
  return httpClient
    .get(
      `/seller/finance/seller/${sellerId}?start_date=${start_date}&end_date=${end_date}`
    )
    .then((res) => res.data?.data[0]);
}

export function getFinancePeriod(sellerId: string | number) {
  return httpClient
    .get(`/seller/finance/period?seller_id=${sellerId}`)
    .then((res) => {
      return res.data.data;
    });
}
