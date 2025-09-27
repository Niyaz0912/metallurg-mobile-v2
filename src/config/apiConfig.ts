import Constants from 'expo-constants';
import { Platform } from 'react-native';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  isDevelopment: boolean;
}

export const getApiConfig = (): ApiConfig => {
  const isDevelopment = __DEV__ || Constants.expoConfig?.extra?.eas?.environment !== 'production';
  let baseURL: string;

  if (process.env.EXPO_PUBLIC_API_URL) {
    baseURL = process.env.EXPO_PUBLIC_API_URL;
    console.log('✅ Using EXPO_PUBLIC_API_URL:', baseURL);
  } else if (Constants.expoConfig?.extra?.apiUrl) {
    baseURL = Constants.expoConfig.extra.apiUrl;
    console.log('✅ Using extra.apiUrl:', baseURL);
  } else if (isDevelopment) {
    baseURL = Platform.select({
      android: 'http://10.0.2.2:3000/api',
      ios: 'http://localhost:3000/api',
      web: 'http://localhost:3000/api',
      default: 'http://159.255.39.41/api'
    }) || 'http://159.255.39.41/api';
    console.log('🔄 Using development URL:', baseURL);
  } else {
    // В production используем правильный URL с /api
    baseURL = 'http://159.255.39.41/api';
    console.log('🚀 Using production URL:', baseURL);
  }

  return {
    baseURL,
    timeout: isDevelopment ? 30000 : 10000,
    isDevelopment
  };
};
