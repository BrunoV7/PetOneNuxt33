export interface Agendamento {
    id: number;
    dataAgendamento: string;
    descricao: string | null;
    pacienteId: number;
    veterinarioId: number;
    procedimentoId: number;
    aprovado: boolean;
    dataCriacao: string;
    dataAtualizacao: string;
  }