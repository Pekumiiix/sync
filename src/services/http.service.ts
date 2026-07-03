import axios from 'axios';

import env from '@/config/env';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN'
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const authStore = useAuthStore();

      authStore.clearCredentials();

      router.replace({
        name: 'Sign In',
        query: { redirect: router.currentRoute.value.fullPath }
      });
    }

    return Promise.reject(error);
  }
);

export default api;
