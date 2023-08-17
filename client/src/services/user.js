import {userApiService} from './api';

export const getUserInfo = async token => {
  try {
    const response = await userApiService.get('/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.log('Request failed:', error);
    throw error;
  }
};
