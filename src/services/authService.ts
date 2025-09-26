import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData } from '../types/auth';
import { Alert } from 'react-native';

interface LoginResponse {
  token: string;
  // можно добавить другие поля, если backend их возвращает
}

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  // Логируем перед отправкой
  console.log('Отправка login-запроса с данными:', credentials);
  Alert.alert('LOGIN REQUEST', JSON.stringify(credentials));

  try {
    const response = await api.post<LoginResponse>('/api/users/login', credentials);

    console.log('Ответ авторизации:', response.data);
    Alert.alert('LOGIN SUCCESS', JSON.stringify(response.data));

    const token = response.data.token;

    // Сохраняем токен в AsyncStorage сразу после логина
    await AsyncStorage.setItem('userToken', token);

    return response.data;
  } catch (error) {
    console.log('Ошибка авторизации:', error);
    Alert.alert(
      'LOGIN ERROR',
      typeof error === 'object' && error !== null
        ? JSON.stringify(error)
        : String(error)
    );

    throw error;
  }
};

