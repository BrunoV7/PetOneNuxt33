import { Paciente } from './Paciente';

export class Usuario {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    pacientes: Paciente[];

    constructor(id: number, username: string, email: string, firstName: string, lastName: string, role: string, pacientes: Paciente[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.pacientes = pacientes;
    }
}