import axios from 'axios';

const baseURL = process.env.SERVER_BASE_URL;

export const httpClient = axios.create({
  baseURL,
});
