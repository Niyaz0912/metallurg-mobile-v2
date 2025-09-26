import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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

    // Alert для диагностики API-запроса
    Alert.alert(
      'API REQUEST',
      `baseURL: ${baseURL}\nurl: ${url}\ntoken: ${token}`
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Failed to get token for request', e);
    Alert.alert('Token error', JSON.stringify(e));
  }
  return config;
});

// Перехват ошибок ответа
api.interceptors.response.use(
  response => response,
  error => {
    Alert.alert('API RESPONSE ERROR', JSON.stringify(error?.message ?? error));
    console.log('API RESPONSE ERROR:', error);
    return Promise.reject(error);
  }
);

export default api;


