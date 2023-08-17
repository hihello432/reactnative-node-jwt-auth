import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:3001';

// Create an instance of axios with the default base URL
const defaultApiService = axios.create({
  baseURL: API_BASE_URL,
});

// Create instances for different routes
const authApiService = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
});

const userApiService = axios.create({
  baseURL: `${API_BASE_URL}/user`,
});

export {defaultApiService, authApiService, userApiService};
