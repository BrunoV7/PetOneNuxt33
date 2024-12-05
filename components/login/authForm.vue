<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/services/api/api';

const router = useRouter();
const username = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);
const isError = ref(false);

const onSubmit = async (event: Event) => {
  // Prevenir comportamento padrão do formulário
  event.preventDefault();

  // Validação básica
  if (!username.value || !password.value) {
    errorMessage.value = 'Por favor, preencha todos os campos';
    isError.value = true;
    return;
  }

  errorMessage.value = '';
  isLoading.value = true;
  isError.value = false;

  const loginPayload = {
    username: username.value,
    password: password.value
  };

  try {
    const response = await api.post('/auth/login', loginPayload);

    if (response.data.access_token) {
      // Usando o composable do Nuxt para definir o cookie
      const authToken = useCookie('authToken', {
        maxAge: 60 * 60 * 24 * 7, // 7 dias
        path: '/',
        secure: true, // só em HTTPS
        sameSite: 'strict' // proteção contra CSRF
      });
      authToken.value = response.data.access_token;

      // Usar replace para substituir a rota atual
      await router.replace('/user/dashboard');
    }
  } catch (error: any) {
    console.error('Erro completo:', error);

    if (error.response) {
      // O servidor respondeu com um status de erro
      console.error('Dados do erro:', error.response.data);
      console.error('Status do erro:', error.response.status);
      errorMessage.value = error.response.data.message || 'Falha no login';
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error('Sem resposta do servidor');
      errorMessage.value = 'Sem resposta do servidor. Verifique sua conexão.';
    } else {
      // Algo aconteceu ao configurar a requisição
      console.error('Erro ao configurar a requisição:', error.message);
      errorMessage.value = 'Erro inesperado. Tente novamente.';
    }

    password.value = '';
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="grid gap-6">
    <form @submit.prevent="onSubmit">
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
          {{ errorMessage }}
        </p>

        <button :disabled="isLoading"
          class="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
          <span>Entrar</span>
        </button>
      </div>
    </form>
  </div>
</template>