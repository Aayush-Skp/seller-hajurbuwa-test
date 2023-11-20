import axios from 'axios';
import { ENVIRONMENT_TYPE, ENVIRONMENT_TYPE_TEST } from '../constants/EnvironmentConstant';

const baseURL = ENVIRONMENT_TYPE === ENVIRONMENT_TYPE_TEST ? 'http://3.110.177.37/api' : 'https://dashboard.hajurbuwa.com/api';

export const httpClient = axios.create({
  baseURL,
});
