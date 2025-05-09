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
// export const updateCliente = async (cliente: Cliente): Promise<Cliente> => {
//   const response = await fetch(`${API_URL}/${cliente.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(cliente),
//   });

//   if (!response.ok) {
//     throw new Error('Erro ao atualizar cliente');
//   }
//   return response.json();
// };

// Função para excluir um cliente
export const deleteCliente = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir cliente');
  }
};



// Na linha 25 (onde você faz a requisição POST), o cliente está sendo enviado 
// com o id = 0 porque o frontend está passando o cliente como ele está 
// antes da requisição. Isso acontece porque o ID do cliente é gerado após a
//  requisição ser feita no backend, e não antes.

// Na linha 40, no console, você vê o id = 1 porque o backend 
// processa a requisição, gera um ID único e retorna o cliente já com o ID correto. 
// Porém, essa mudança não está refletida no frontend até a resposta ser recebida, 
// e pode ser que o frontend ainda esteja utilizando o ID original (0).


// Resumo das mudanças:
// Frontend: Agora, ao criar um cliente, o id é removido antes de enviar a
//  requisição para a API. O cliente é enviado sem o id, permitindo que o 
// backend gere um novo ID para ele.

// Backend: O backend agora gera o id automaticamente para cada cliente, e 
// isso resolve o problema de IDs duplicados ou errados.







