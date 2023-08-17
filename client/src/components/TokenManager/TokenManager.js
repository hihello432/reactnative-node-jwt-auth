// TokenManager.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.log('Error getting token:', error);
    return null;
  }
};

export const setToken = async token => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.log('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.log('Error removing token:', error);
  }
};

export const updateToken = async newToken => {
  try {
    await removeToken(); // Remove the old token
    await setToken(newToken); // Set the new token
  } catch (error) {
    console.log('Error updating token:', error);
  }
};
