import axios from 'axios';

const baseURL = 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});

httpClient.defaults.headers.common.Authorization =
  'Bearer 13|xLQYQ3EZowrAGO3ZhAQugUeaYmkHAYesJc4NSBFk';
