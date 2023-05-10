import { httpClient } from '../config/httpClient';

const registrationURL = '/seller/register';

export function registerSeller(registrationData: any) {
  const formData = new FormData();

  formData.append('phone', registrationData.phone);
  formData.append('first_name', registrationData.first_name);
  formData.append('last_name', registrationData.last_name);
  formData.append('password', registrationData.password);
  formData.append('email', registrationData.email);
  formData.append('company_name', registrationData.company_name);
  formData.append('pan_number', registrationData.pan_number);
  formData.append('pan_image', registrationData.pan_image);
  formData.append(
    'confirm_terms_and_conditions',
    registrationData.confirm_terms_and_conditions ? '1' : '0'
  );
  formData.append(
    'receive_updates_on_whatsapp',
    registrationData.receive_updates_on_whatsapp ? '1' : '0'
  );

  return httpClient.post(registrationURL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
