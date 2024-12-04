import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter()
// Configurar a instância do Axios

const api = axios.create({
  baseURL: "http://localhost:8080/api" // Use variáveis de ambiente
});

// Interceptador de requisição
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  
  // Adicionar token de autorização se existir e não estiver na página de login
  if (token && router.currentRoute.value.path !== '/login') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptador de resposta
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          alert('401 - Usuário não autenticado');
          router.push('/login');
          break;
        case 403:
          alert('403 - Usuário não autorizado');
          break;
        default:
          console.error('HTTP error:', error.response);
      }
    } else if (error.request) {
      // Requisição feita, mas sem resposta
      console.error('No response received:', error.request);
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;