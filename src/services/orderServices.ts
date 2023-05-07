import { httpClient } from '../config/httpClient';

export function searchOrdersWithStatusAndKeyword(
  status: string,
  keyword: string
) {
  return httpClient
    .get(`/seller/get-orders/search?status=${status}&keyword=${keyword}`)
    .then((res) => res.data);
}

export function getOrdersByStatus(status: string) {
  return httpClient
    .post('/seller/get-orders', {
      status,
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
    .post(`seller/set-order-status/${orderId}`, {
      status,
      reason,
    })
    .then((res) => res.data.data);
}

export function replyToAnOrder(orderId: string | number, message: string) {
  return httpClient
    .post(`/seller/order/reply/${orderId}`, {
      message,
    })
    .then((res) => res.data);
}
