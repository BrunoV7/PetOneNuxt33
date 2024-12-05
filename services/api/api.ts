// api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NUXT_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionar interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const publicRoutes = ['/auth/login', '/auth/register'];
    
    const isPublicRoute = publicRoutes.some(route => 
      config.url?.includes(route)
    );
    
    if (!isPublicRoute && process.client) {
      const authToken = useCookie('authToken');
      if (authToken.value) {
        config.headers.Authorization = `Bearer ${authToken.value}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado
      const authToken = useCookie('authToken');
      authToken.value = null;
      navigateTo('/login');
    }
    return Promise.reject(error);
  }
);

export default api;