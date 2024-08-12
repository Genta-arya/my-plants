import axios from 'axios';

export const AxiosConfig = axios.create({
  baseURL: 'https://www.api-library.site', // Ganti dengan baseURL API kamu
  timeout: 10000, // Waktu tunggu (timeout) permintaan dalam milidetik
  headers: {
    'Content-Type': 'application/json',
    // Tambahkan header lain yang diperlukan di sini
  },
});

// Interceptor untuk menambahkan token otentikasi sebelum setiap permintaan
AxiosConfig.interceptors.request.use(
  config => {
    const token = 'your-token-here'; // Ganti dengan logika untuk mendapatkan token yang valid
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Interceptor untuk menangani respons
AxiosConfig.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);
