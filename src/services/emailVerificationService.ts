import { httpClient } from '../config/httpClient';

const emailValidationURL = '/seller/verify/email';

export function emailVerificationService(email: string) {
  console.log(email);
  const formData = new FormData();
  formData.append('email', email);
  return httpClient
    .post(emailValidationURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function checkIfEmailExist(email: string) {
  return httpClient
    .post('/check-email', {
      email,
    })
    .then((res) => res.data);
}
