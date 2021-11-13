import axios from 'axios';
import CoreService from './CoreService';

const url =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_API_BASE_URL
    : 'http://localhost:8080';

const dwarfityApi = axios.create({
  baseURL: url,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json'
  }
});

export const CoreServiceInstance = new CoreService(dwarfityApi);
