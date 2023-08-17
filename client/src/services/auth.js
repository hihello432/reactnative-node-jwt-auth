import {authApiService} from './api';

export const signUpUser = async ({data}) => {
  try {
    const response = await authApiService.post('/register', {data});
    return response.data;
  } catch (error) {
    console.log('Request failed:', error);
    throw error;
  }
};

export const signInUser = async ({data}) => {
  try {
    const response = await authApiService.post('/login', {data});
    return response.data;
  } catch (error) {
    console.log('Request failed:', error);
    throw error;
  }
};

export const logoutUser = async token => {
  try {
    const response = await authApiService.get('/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log('Request failed:', error);
    throw error;
  }
};
