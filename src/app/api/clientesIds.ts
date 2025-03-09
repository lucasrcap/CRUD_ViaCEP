import { NextApiRequest, NextApiResponse } from 'next';
import { Cliente } from '../models/Cliente'

// Banco de dados simulado (poderia ser uma conexão com banco de dados real)
let clientes: Cliente[] = [
  {
    id: 1,
    nome: 'João',
    sobrenome: 'Silva',
    email: 'joao.silva@example.com',
    dataNascimento: '1990-05-15',
    endereco: {
      cep: '01001000',
      logradouro: 'Rua A, 123',
      bairro: 'Centro',
      estado: 'SP',
      localidade: '',
      complemento: ''
    },
    telefone: '(11) 99999-9999',
  },
  {
    id: 2,
    nome: 'Maria',
    sobrenome: 'Oliveira',
    email: 'maria.oliveira@example.com',
    dataNascimento: '1985-08-20',
    endereco: {
      cep: '01001-000',
      logradouro: 'Avenida B, 456',
      bairro: 'Bairro X',
      estado: 'SP',
      localidade: '',
      complemento: ''
    },
    telefone: '(11) 98888-8888',
  },
];

// Função para lidar com as requisições de GET, PUT e DELETE para /api/clientes/[id]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Encontrar o cliente pelo ID
  const clienteIndex = clientes.findIndex((c) => c.id === parseInt(id as string));

  if (clienteIndex === -1) {
    return res.status(404).json({ message: 'Cliente não encontrado' });
  }

  switch (req.method) {
    case 'GET':
      // Retorna o cliente específico
      return res.status(200).json(clientes[clienteIndex]);
    case 'PUT':
      // Atualiza o cliente
      clientes[clienteIndex] = { ...clientes[clienteIndex], ...req.body };
      return res.status(200).json(clientes[clienteIndex]);
    case 'DELETE':
      // Exclui o cliente
      clientes.splice(clienteIndex, 1);
      return res.status(204).end();
    default:
      return res.status(405).json({ message: 'Método não permitido' });
  }
}

//CLIENTES.TS:

// import { NextApiRequest, NextApiResponse } from 'next';
// import { Cliente, Endereco } from '../../models/Cliente'
// import { buscarEnderecoPorCep } from '@/app/lib/cepAPI';

// let clientes: Cliente[] = [
//   {
//     id: 1,
//     nome: 'João',
//     sobrenome: 'Silva',
//     email: 'joao.silva@example.com',
//     dataNascimento: '1990-05-15',
//     endereco: {
//       cep: '01001-000', // Aqui deve ser um CEP válido, como exemplo
//       logradouro: 'Rua A, 123',
//       bairro: 'Centro',
//       estado: 'SP',
//     },
//     telefone: '(11) 99999-9999',
//   },
//   // Outros clientes podem ser adicionados aqui...
// ];

// // Função para lidar com as requisições para /api/clientes
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case 'GET':
//       // Retorna todos os clientes
//       return res.status(200).json(clientes);

//     case 'POST':
//       // Cria um novo cliente e busca o endereço via CEP
//       const newCliente: Cliente = req.body;
//       const { cep } = newCliente.endereco; // Supomos que o cep foi enviado no corpo da requisição

//       if (!cep || cep.length !== 9) {
//         // Verifica se o cep está correto
//         return res.status(400).json({ message: 'CEP inválido' });
//       }

//       try {
//         // Busca o endereço usando o cep fornecido
//         const enderecoData = await buscarEnderecoPorCep(cep);

//         // Preenche o campo endereco com os dados retornados da API
//         newCliente.endereco = {
//           cep: enderecoData.cep,
//           logradouro: enderecoData.logradouro,
//           bairro: enderecoData.bairro,
//           estado: enderecoData.uf,
//         };

//         // Atribui um id ao novo cliente
//         newCliente.id = clientes.length ? Math.max(...clientes.map((c) => c.id)) + 1 : 1;

//         // Adiciona o novo cliente à lista
//         clientes.push(newCliente);

//         return res.status(201).json(newCliente);

//       } catch (error: unknown) {
//         if (error instanceof Error) {
//           // Agora podemos acessar error.message com segurança
//           return res.status(400).json({ message: 'Erro ao buscar o endereço', error: error.message });
//         } else {
//           // Caso o erro não seja uma instância de Error, retornamos um erro genérico
//           return res.status(400).json({ message: 'Erro desconhecido ao buscar o endereço' });
//         }
//       }

//     default:
//       return res.status(405).json({ message: 'Método não permitido' });
//   }
// }

