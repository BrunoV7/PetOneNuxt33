<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/services/api/api';


const router = useRouter();

onMounted(async () => {
  try {
    const tutorResponse = await api.get('/tutores/me');
    console.log('Dados do Tutor recebidos:', tutorResponse.data);
    router.push('/user/dashboard');
  } catch (tutorError) {
    console.error('Erro ao buscar dados do Tutor:', tutorError);
    // Adicione aqui sua lógica de tratamento de erro
  }
});

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <div>
    <!-- Seu template aqui -->
  </div>
</template>