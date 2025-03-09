import { Endereco } from "../models/Cliente";
  
  export interface Cliente {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: string;
    endereco: Endereco;
    telefone: string;
  }
  