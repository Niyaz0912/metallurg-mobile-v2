import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://159.255.39.41',
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    console.log('Token for request:', token);
    
    // Безопасная проверка на undefined
    const baseURL = config.baseURL || '';
    const url = config.url || '';
    console.log('Request URL:', baseURL + url);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Failed to get token for request', e);
  }
  return config;
});

export default api;

