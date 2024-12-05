<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/services/api/api';
import statuslist from '~/components/dashboard/statuslist.vue';


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
/* LOGIN
definePageMeta({
  middleware: 'auth'
});
*/
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Dashboard
      </h2>
    </div>
    <Tabs default-value="overview" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" disabled>
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <statuslist />
      </TabsContent>
    </Tabs>
  </div>
</template>