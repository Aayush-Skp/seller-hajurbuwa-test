import axios from 'axios';
import { ENVIRONMENT_TYPE, ENVIRONMENT_TYPE_TEST } from '../constants/EnvironmentConstant';

const baseURL = ENVIRONMENT_TYPE === ENVIRONMENT_TYPE_TEST ? 'http://127.0.0.1:8000/api' : 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});