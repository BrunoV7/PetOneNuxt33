export class Paciente {
    id: number;
    nome: string;
    dataNascimento: string;
    especie: string;
    raca: string;
    descricao: string;

    constructor(id: number, nome: string, dataNascimento: string, especie: string, raca: string, descricao: string) {
        this.id = id;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.especie = especie;
        this.raca = raca;
        this.descricao = descricao;
    }
}