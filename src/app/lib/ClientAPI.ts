import { Cliente } from '../models/Cliente';

const API_URL = 'http://localhost:3000/api/clientes'; // URL base da API (pode ser alterada conforme necessário)

// Função para obter todos os clientes
export const getClientes = async (): Promise<Cliente[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Erro ao buscar clientes');
  }
  return response.json();
};

// Função para obter um cliente específico pelo ID
export const getClienteById = async (id: number): Promise<Cliente> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar cliente');
  }
  return response.json();
};

// Função para criar um novo cliente
export const createCliente = async (cliente: Cliente): Promise<Cliente> => {
  // console.log(cliente); // Verifique os dados antes de enviar para a API
  const { id, ...clienteSemId } = cliente;
  console.log('Cliente enviado para a API (sem ID):', clienteSemId)

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clienteSemId),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    console.error('Erro ao criar cliente:', errorDetails);
    console.error('Status HTTP:', response.status);
    throw new Error(`Erro ao criar cliente: ${errorDetails} (Status: ${response.status})`);
  }

  const data = await response.json();
  console.log('Cliente criado (com ID):', data); 
  return data;
};


// Função para atualizar um cliente existente
export const updateCliente = async (cliente: Cliente) => {
  const response = await fetch(`/api/clientes/${cliente.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cliente),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar cliente');
  }

  return await response.json();
};

// Função para excluir um cliente
export const deleteCliente = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir cliente');
  }
};











