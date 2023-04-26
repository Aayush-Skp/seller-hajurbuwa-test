import { httpClient } from '../config/httpClient';

export function checkIfPANExist(pan: string, user: string) {
  const formData = new FormData();

  formData.append('pan_no', pan);
  formData.append('user', user);

  return httpClient
    .post('/verify-pan-no', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}
