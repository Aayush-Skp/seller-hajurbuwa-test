import axios from 'axios';

const baseURL = 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});

httpClient.defaults.headers.common.Authorization =
  'Bearer 7|vyxfCdXTHrPB6ZeBMKmH1a2ZCsX3k7X1HV437UeR';
