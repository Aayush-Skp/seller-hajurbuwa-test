import axios from 'axios';
import { ENVIRONMENT_TYPE, ENVIRONMENT_TYPE_TEST } from '../constants/EnvironmentConstant';

const baseURL = ENVIRONMENT_TYPE === ENVIRONMENT_TYPE_TEST ? 'http://3.7.253.250/api' : 'https://devdashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});
