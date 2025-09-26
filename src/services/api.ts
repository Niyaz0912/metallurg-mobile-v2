import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { getApiConfig } from '../config/apiConfig';
import { TokenStorage } from '../utils/tokenStorage';
import { Alert } from 'react-native';

// Получаем конфигурацию API
const config = getApiConfig();
console.log('🔧 API Configuration:', config);

// Создаем экземпляр axios с динамической конфигурацией
const api = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
});

// Interceptor для добавления токена авторизации
api.interceptors.request.use(async (requestConfig: InternalAxiosRequestConfig) => {
  try {
    const token = await TokenStorage.getToken();
    
    if (config.isDevelopment) {
      console.log('Token for request:', token);
      
      // Безопасная проверка на undefined
      const baseURL = requestConfig.baseURL || '';
      const url = requestConfig.url || '';
      console.log('Request URL:', baseURL + url);
      
      // Alert только в development режиме
      Alert.alert(
        'API REQUEST',
        `baseURL: ${baseURL}\nurl: ${url}\ntoken: ${token ? 'present' : 'missing'}`
      );
    }

    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    console.error('Failed to get token for request', e);
    
    if (config.isDevelopment) {
      Alert.alert('Token error', e instanceof Error ? e.message : String(e));
    }
  }
  return requestConfig;
});

// Interceptor для обработки ошибок ответа
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API RESPONSE ERROR:', error);
    
    // Показываем Alert только в development режиме
    if (config.isDevelopment) {
      const errorMessage = error.message || 
                          error.response?.statusText || 
                          'Unknown error';
      Alert.alert('API RESPONSE ERROR', errorMessage);
    }
    
    return Promise.reject(error);
  }
);

export default api;
