import { httpClient } from '../config/httpClient';
import { PhoneNumberType } from '../validation/sellerRegistrationSchema';

export function phoneVerificationService(data: PhoneNumberType) {
  return httpClient.post('/check-number', data).then((res) => res.data);
}

export function sendOTPToPhone(phone: string) {
  const formData = new FormData();

  formData.append('phone', phone);

  return httpClient
    .post('/send-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function verifyOTPSentToPhone(phone: string, code: string) {
  const formData = new FormData();

  formData.append('phone', phone);
  formData.append('code', code);

  return httpClient
    .post('/verify-otp', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}
