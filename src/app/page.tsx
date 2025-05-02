'use client'; // Isso garante que o código é executado no lado do cliente

import { useState, useEffect } from 'react';
import ClienteForm from '../app/components/ClientForm'; // Componente para criar e editar clientes
import { Cliente } from './models/Cliente'; // Interface de cliente
import { getClientes, createCliente } from '../app/lib/ClientAPI'; // Funções para buscar e criar clientes
import { maskTelefoneCelular } from '../app/utils/formatters'; // Função de formatação de telefone

const Page = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCliente = async (cliente: Cliente) => {
    try {
      await createCliente(cliente);
      fetchClientes();
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    // <div className="container mx-auto p-1">
    <div className="w-full h-screen p-1">
      
      <h1 className="text-center font-bold text-3xl text-blue-900 bg-blue-200 leading-relaxed">Gestão de Clientes</h1>
      
      <ClienteForm onSubmit={handleCreateCliente} />

      {loading ? (
        <p>Carregando clientes...</p>
      ) : (
        <div className="bg-gray-200">
          {clientes.length > 0 && (
            <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
          )}
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.id} className="mb-4 p-4 border border-gray-300 rounded">
                <h3 className="font-bold text-lg">
                  {cliente.nome} {cliente.sobrenome}
                </h3>
                <p><strong>Email:</strong> {cliente.email}</p>
                <p><strong>Telefone:</strong> {maskTelefoneCelular(cliente.telefone)}</p>
                <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
                <div>
                  <h4 className="font-semibold">Endereço: </h4>
                  <p><strong>CEP</strong> {cliente.endereco.cep}</p>
                  <p><strong>Logradouro</strong> {cliente.endereco.logradouro}</p>
                  <p><strong>Bairro</strong> {cliente.endereco.bairro}</p>
                  <p><strong>Estado</strong> {cliente.endereco.estado}</p>
                  <p><strong>Cidade</strong> {cliente.endereco.localidade}</p>
                  { <p><strong>Complemento</strong> {cliente.endereco.complemento}</p> }
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
