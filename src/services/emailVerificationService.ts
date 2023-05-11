import { httpClient } from '../config/httpClient';

export function emailVerificationService(email: string, name: string) {
  const formData = new FormData();

  formData.append('email', email);
  formData.append('name', name);

  return httpClient
    .post('/seller/verify/email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function verifyOTPSentToEmail(otp: string) {
  const formData = new FormData();

  formData.append('code', otp);

  return httpClient.post('/seller/email/code/check', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function checkIfEmailExist(email: string) {
  return httpClient
    .post('/check-email', {
      email,
    })
    .then((res) => res.data);
}
