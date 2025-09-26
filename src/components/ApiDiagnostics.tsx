import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import api from '../services/api';

export const ApiDiagnostics: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<string>('');

  const runDiagnostics = async () => {
    const info = {
      'process.env.EXPO_PUBLIC_API_URL': process.env.EXPO_PUBLIC_API_URL,
      'Constants.expoConfig?.extra?.apiUrl': Constants.expoConfig?.extra?.apiUrl,
      'api.defaults.baseURL': api.defaults.baseURL,
      'Platform': require('react-native').Platform.OS,
      '__DEV__': __DEV__
    };
    
    setDiagnostics(JSON.stringify(info, null, 2));
    
    // Тест подключения
    try {
      const response = await api.get('/health');
      Alert.alert('API Test', 'Connection successful!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error occurred';
      Alert.alert('API Test Failed', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Run API Diagnostics" onPress={runDiagnostics} />
      <Text style={styles.diagnosticsText}>
        {diagnostics}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  diagnosticsText: {
    fontFamily: 'monospace',
    fontSize: 10,
    marginTop: 16,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  }
});