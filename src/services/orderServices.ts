import { httpClient } from '../config/httpClient';

export function getOrdersByStatus(url: string, signal?: AbortSignal) {
  if (url.includes('/orders/search')) {
    return httpClient.get(url, { signal }).then((res) => res.data);
  }

  const queryString = url.includes('?') ? url.split('?')[1] : 'page=1';
  const params = new URLSearchParams(queryString);
  const status = params.get('status') || 'pending';
  const path = url.startsWith('/seller/')
    ? url.split('?')[0] + (queryString ? `?${queryString}` : '')
    : `/seller/get-orders?${queryString}`;

  return httpClient
    .post(path, {
      status,
      date_from: params.get('date_from') || undefined,
      date_to: params.get('date_to') || undefined,
      payment_mode: params.get('payment_mode') || undefined,
      payment_status: params.get('payment_status') || undefined,
    }, {
      signal,
    })
    .then((res) => res.data);
}

export function getSingleOrderDetails(orderId: string | number) {
  return httpClient
    .get(`/seller/order-detail/${orderId}`)
    .then((res) => res.data.data);
}

export function changeOrderStatus({
  orderId,
  status,
  reason,
}: {
  orderId: string | number;
  status: string;
  reason?: string;
}) {
  return httpClient
    .post(`/seller/set-order-status/${orderId}`, {
      status,
      reason,
    })
    .then((res) => res.data);
}

export function replyToAnOrder(orderId: string | number, message: string) {
  return httpClient
    .post(`/seller/order/reply/${orderId}`, {
      message,
    })
    .then((res) => res.data);
}
