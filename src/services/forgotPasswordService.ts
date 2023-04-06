import { httpClient } from '../config/httpClient';
import {
  EmailSchemaType,
  MatchPasswordSchemaType,
} from '../validation/forgotPasswordSchema';

const Url = 'seller/password';

export function forgotPasswordService(data: EmailSchemaType) {
  return httpClient.post(`${Url}/email`, data).then((res) => res.data);
}

export function validateOTP(otp: string) {
  return httpClient
    .post(`${Url}/code/check`, {
      code: otp,
    })
    .then((res) => res.data);
}

type ResetPasswordArgs = MatchPasswordSchemaType & {
  code: string;
};

export function resetPassword(data: ResetPasswordArgs) {
  return httpClient.post(`${Url}/reset`, data).then((res) => res.data);
}
