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
  
  // Приоритет получения API URL:
  // 1. EXPO_PUBLIC_API_URL (для новых Expo SDK)
  // 2. Constants.expoConfig.extra.apiUrl (из app.config.js)
  // 3. Проверяем платформу и среду
  // 4. Fallback URL
  
  if (process.env.EXPO_PUBLIC_API_URL) {
    baseURL = process.env.EXPO_PUBLIC_API_URL;
    console.log('✅ Using EXPO_PUBLIC_API_URL:', baseURL);
  } else if (Constants.expoConfig?.extra?.apiUrl) {
    baseURL = Constants.expoConfig.extra.apiUrl;
    console.log('✅ Using extra.apiUrl:', baseURL);
  } else if (isDevelopment) {
    // В разработке используем локальный IP
    baseURL = Platform.select({
      android: 'http://10.0.2.2:3000', // Android emulator
      ios: 'http://localhost:3000',     // iOS simulator
      web: 'http://localhost:3000',     // Web
      default: 'http://159.255.39.41'   // Реальное устройство
    }) || 'http://159.255.39.41';
    console.log('🔄 Using development URL:', baseURL);
  } else {
    // В production используем хардкод как fallback
    baseURL = 'http://159.255.39.41'; // Замените на production URL когда будет готов
    console.log('🚀 Using production URL:', baseURL);
  }
  
  return {
    baseURL,
    timeout: isDevelopment ? 30000 : 10000,
    isDevelopment
  };
};