<script setup lang="ts">
import { ref } from 'vue'
import type { AuxToken } from '~/models/AuxToken';
import api from '~/services/api/api'

const isLoading = ref(false)
const isError = ref(false)
const errorMessage = ref('')
const username = ref('')
const password = ref('')

// Configure axios timeout (if using axios)
api.defaults.timeout = 10000 // 10 seconds timeout

async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;
  isError.value = false;
  errorMessage.value = '';

  const loginPayload = {
    username: username.value,
    password: password.value,
  };

  console.log('Login payload enviado:', loginPayload);

  try {
    // Primeira tentativa de login
    const response = await api.post<{ access_token?: string; auxtoken?: AuxToken }>('/auth/login', loginPayload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Resposta recebida do backend:', response);
    const token = response.data?.access_token || response.data?.auxtoken?.access_token;

    if (token) {
      console.log('Token recebido:', token);
      localStorage.setItem('authToken', token);
      // TODO: Redirecionar para a página inicial ou dashboard
    } else {
      throw new Error('Token não encontrado na resposta');
    }
  } catch (error: any) {
    console.error('Erro ao enviar requisição:', error);
    isError.value = true;
    password.value = '';

    // Gerenciamento detalhado de erros
    if (error.response) {
      // O servidor respondeu com um status code fora da faixa 2xx
      errorMessage.value = error.response.data.message || 'Login failed';
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      errorMessage.value = 'Server is not responding. Please try again later.';
    } else {
      // Algo inesperado ocorreu na configuração da requisição
      errorMessage.value = 'An unexpected error occurred.';
    }

    console.error('Detalhes do erro de login:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="grid gap-6">
    <form @submit="onSubmit">
      <div class="grid gap-2 items-center">
        <div class="grid gap-1">
          <label class="sr-only" for="email">Email</label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            :class="{
              'border-red-500': isError,
              'border-slate-200': !isError
            }" id="email" placeholder="name@example.com" type="email" v-model="username" auto-capitalize="none"
            auto-complete="email" auto-correct="off" :disabled="isLoading" />
          <label class="sr-only" for="password">Password</label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            :class="{
              'border-red-500': isError,
              'border-slate-200': !isError
            }" id="password" placeholder="********" type="password" v-model="password" auto-capitalize="none"
            auto-correct="off" :disabled="isLoading" />
        </div>

        <!-- Mensagem de erro -->
        <p v-if="isError" class="text-red-500 text-sm mt-1">
          Email ou senha inválidos. Tente novamente.
        </p>

        <button :disabled="isLoading"
          class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <span>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>
