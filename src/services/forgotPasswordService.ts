import { httpClient } from '../config/httpClient';
import {
  EmailSchemaType,
  MatchPasswordSchemaType,
} from '../validation/forgotPasswordSchema';

type ResetPasswordArgs = MatchPasswordSchemaType & {
  code: string;
};

const Url = 'seller/password';

export function forgotPasswordService(data: EmailSchemaType) {
  const formData = new FormData();

  formData.append('email', data.email);

  return httpClient
    .post(`${Url}/email`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}

export function validateOTP(otp: string) {
  return httpClient
    .post(`${Url}/code/check`, {
      code: otp,
    })
    .then((res) => res.data);
}

export function resetPassword(data: ResetPasswordArgs) {
  const formData = new FormData();

  formData.append('code', data.code);
  formData.append('password', data.password);
  formData.append('password_confirmation', data.password_confirmation);

  return httpClient
    .post(`${Url}/reset`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => res.data);
}
