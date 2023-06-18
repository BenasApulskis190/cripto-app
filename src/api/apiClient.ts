import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';
const apiKey = import.meta.env.VITE_API_KEY;
const baseUrl = isDevelopment ? '/api' : import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'X-CMC_PRO_API_KEY': apiKey,
  },
});

export default apiClient;
