import { httpClient } from '../config/httpClient';

type LoginServiceArgs = {
  email: string;
  password: string;
};

export function loginService(data: LoginServiceArgs) {
  return httpClient.post('/seller/login', data).then((res) => res.data);
}
