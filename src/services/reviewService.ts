import { httpClient } from '../config/httpClient';

export function replyToReview(orderId: string | number, message: string) {
  const formData = new FormData();

  formData.append('message', message);

  return httpClient.post(`/seller/order/reply/${orderId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
