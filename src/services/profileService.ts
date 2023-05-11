import { httpClient } from '../config/httpClient';

export function getBankList() {
  return httpClient.get('/list-banks').then((res) => res?.data?.data);
}

export function getAllLocation() {
  return httpClient.get('/get-locations').then((res) => res?.data?.data);
}

export function addBankDetails(data: any) {
  const formData = new FormData();

  formData.append('account_name', data.account_name);
  formData.append('account_number', data.account_number);
  formData.append('bank', data.bank_id);

  return httpClient.post('/seller/update-bank-info', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function addWarehouseInfo(data: any) {
  const formData = new FormData();

  formData.append('state', data.state_id);
  formData.append('city', data.city_id);
  formData.append('area', data.area_id);
  formData.append('address_line_1', data.addressLine1);
  formData.append('address_line_2', data.addressLine2);

  return httpClient.post('/seller/update-warehouse-info', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function updatePersonalDetails(data: any) {
  const formData = new FormData();

  formData.append('first_name', data.fname);
  formData.append('last_name', data.lname);
  formData.append('email', data.email);
  formData.append('company_name', data.company_name);
  formData.append('pan_number', data.pan_number);
  formData.append('pan_image', data.pan_image);

  return httpClient.post('/seller/update-seller-info', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
