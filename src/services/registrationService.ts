import { httpClient } from '../config/httpClient';

const registrationURL = '/seller/register';

export function registrationService(data: FormData) {
  return httpClient
    .post(registrationURL, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}
