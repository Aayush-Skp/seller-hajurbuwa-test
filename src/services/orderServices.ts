import { httpClient } from '../config/httpClient';

export function getOrdersByStatus(status: string) {
  return httpClient
    .post('/seller/get-orders', {
      status,
    })
    .then((res) => res.data.data);
}

export function getSingleOrderDetails(orderId: string | number) {
  return httpClient
    .get(`/seller/order-detail/${orderId}`)
    .then((res) => res.data.data);
}

export function changeOrderStatus({
  orderId,
  status,
}: {
  orderId: string | number;
  status: string;
}) {
  return httpClient
    .post(`seller/set-order-status/${orderId}`, {
      status,
    })
    .then((res) => res.data.data);
}
