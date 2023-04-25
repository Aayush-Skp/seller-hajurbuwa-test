import { httpClient } from '../config/httpClient';

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
  formData.append('address_line_2', data.addressLine1);

  return httpClient.post('/seller/update-warehouse-info', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
