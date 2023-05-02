import { httpClient } from '../config/httpClient';

type LoginServiceArgs = {
  email: string;
  password: string;
};

export function loginService(data: LoginServiceArgs) {
  const formData = new FormData();

  formData.append('email', data.email);
  formData.append('password', data.password);

  return fetch('https://dashboard.hajurbuwa.com/api/seller/login', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch(console.log);
  // return httpClient.post('/seller/login', data).then((res) => res.data);
}
