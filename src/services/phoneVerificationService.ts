import { httpClient } from '../config/httpClient';
import { PhoneNumberType } from '../validation/sellerRegistrationSchema';

const phoneValidationURL = '/check-number';

export function phoneVerificationService(data: PhoneNumberType) {
  return httpClient.post(phoneValidationURL, data).then((res) => res);
}
