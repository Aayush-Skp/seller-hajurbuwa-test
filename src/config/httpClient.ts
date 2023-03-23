import axios from 'axios';

const baseURL = 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});
