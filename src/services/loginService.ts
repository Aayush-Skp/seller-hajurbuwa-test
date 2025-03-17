// services/loginService.ts

import { httpClient } from '../config/httpClient';

type LoginServiceArgs = {
  email: string;
  password: string;
};

export function loginService(data: LoginServiceArgs) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);

  return httpClient
    .post('/seller/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}