<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '~/services/api/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area';
import Card from '~/components/dashboard/card/card.vue';
import CardHeader from '~/components/dashboard/card/cardheader.vue';
import CardTitle from '~/components/dashboard/card/cardtitle.vue';
import CardContent from '~/components/dashboard/card/cardcontent.vue';
import type { Usuario } from '~/DTO/Tutor';
import type { Agendamento } from '~/DTO/Agendamento';

interface Pet {
  id: string;
  name: string;
  description: string;
}

const tutor = ref<Usuario | null>(null);
const agendamentos = ref<Agendamento[]>([]);
const numPacientes = ref<number>(0);
const nome = ref<string>();
const pets = ref<Pet[]>([]);

const router = useRouter();

onMounted(async () => {
  try {
    const tutorResponse = await api.get<Usuario>('/tutores/me');
    tutor.value = tutorResponse.data;
    console.log('Dados do Tutor recebidos:', tutor.value);
    nome.value = tutor.value?.firstName;
    numPacientes.value = tutor.value?.pacientes?.length || 0;
    pets.value = tutor.value?.pacientes.map(paciente => ({
      id: paciente.id.toString(),
      name: paciente.nome,
      description: paciente.descricao
    })) || [];

    if (tutor.value?.email) {
      const agendamentosResponse = await api.get<Agendamento[]>(`/agendamentos/tutor/${tutor.value.email}`);
      agendamentos.value = agendamentosResponse.data;
      console.log('Agendamentos recebidos:', agendamentos.value);
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    // You might want to show an error message to the user here
  }
});
/*
definePageMeta({
  middleware: 'auth'
});
*/
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2 mb-3">
      <h2 class="text-3xl font-bold tracking-tight">Olá! {{nome}}</h2>
    </div>
    <Tabs default-value="overview" class="space-y-4">
      <TabsList class="mb-3">
        <TabsTrigger value="overview">Dashboard</TabsTrigger>
        <TabsTrigger value="analytics">Pets</TabsTrigger>
        <TabsTrigger value="reports">Agendamentos</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Pets Registrados:</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#e8eaed">
                <path d="M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ numPacientes }}</div>
              <p class="text-xs text-muted-foreground">pets cadastrados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">Agendamentos Realizados:</CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="h-4 w-4 text-muted-foreground">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">{{ agendamentos.length }}</div>
              <p class="text-xs text-muted-foreground">procedimentos realizados</p>
            </CardContent>
          </Card>
        </div>
        <div class="flex-1 space-y-4 flex gap-4">
          <div class="w-full" style="margin: 0;">
            <h3 class="text-lg font-medium tracking-tight">Seus Pets:</h3>
            <ScrollArea class="h-[400px] w-full rounded-md border p-4">
              <Card v-for="pet in pets" :key="pet.id" class="mb-4">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">{{ pet.name }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="text-sm">{{ pet.description }}</div>
                </CardContent>
              </Card>
            </ScrollArea>
          </div>
          <div class="w-full" style="margin: 0;">
            <h3 class="text-lg font-medium tracking-tight">Próximos agendamentos:</h3>
            <ScrollArea class="h-[400px] w-full rounded-md border p-4">
              <Card v-for="agendamento in agendamentos" :key="agendamento.id" class="mb-4">
                <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle class="text-sm font-medium">{{ agendamento.descricao || 'Sem descrição' }}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div class="text-sm"><strong>Data: </strong>{{ agendamento.dataAgendamento }}</div>
                  <div class="text-sm"><strong>Aprovado: </strong>{{ agendamento.aprovado ? 'Sim' : 'Não' }}</div>
                </CardContent>
              </Card>
            </ScrollArea>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" class="space-y-4">
        <!-- Content for Pets tab -->
      </TabsContent>
      <TabsContent value="reports" class="space-y-4">
        <!-- Content for Agendamentos tab -->
      </TabsContent>
    </Tabs>
  </div>
</template>