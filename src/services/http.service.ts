import axios from 'axios';

import env from '@/config/env';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.store';

const api = axios.create({
  baseURL: `${env.apiUrl}/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
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

      const currentPath = window.location.pathname;
      const currentFullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const isAppRoute = currentPath.startsWith('/app');

      const requestToken = error.config?.headers?.Authorization;
      const currentToken = localStorage.getItem('auth_token');
      const wasCurrentToken =
        requestToken === `Bearer ${currentToken}` || (!requestToken && !currentToken);

      if (wasCurrentToken) {
        authStore.clearCredentials();

        if (isAppRoute) {
          router.replace({
            name: 'Sign In',
            query: { redirect: currentFullPath }
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
