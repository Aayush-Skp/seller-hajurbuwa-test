import axios from 'axios';

const baseURL = 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});

httpClient.defaults.headers.common.Authorization =
  'Bearer 18|2h6F7WscHROZxPTzjueCHkYRDD1r53naPWwaRkwS';
