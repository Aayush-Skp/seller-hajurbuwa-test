import { httpClient } from '../config/httpClient';

const emailValidationURL = '/seller/verify/email';

export function emailVerificationService(email: string, name: string) {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  return httpClient
    .post(emailValidationURL, formData, {
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
