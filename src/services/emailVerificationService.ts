import { httpClient } from '../config/httpClient';

const emailValidationURL = '/verify/email';

export function emailVerificationService(email: string) {
  return httpClient
    .post(emailValidationURL, {
      email,
    })
    .then((res) => res.data.status);
}

export function checkIfEmailExist(email: string) {
  return httpClient
    .post('/check-email', {
      email,
    })
    .then((res) => res.data.status);
}
