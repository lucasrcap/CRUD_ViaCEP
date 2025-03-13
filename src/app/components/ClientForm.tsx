import { useState } from 'react';
import { Cliente } from '../types/ClientD';
import { isValidEmail, isValidTelefone } from '../utils/validators';
import { estados } from '../utils/estados';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

// Definindo o tipo para as props do ClienteForm
interface ClienteFormProps {
  onSubmit: (cliente: Cliente) => void;
}

const ClienteForm = ({ onSubmit }: ClienteFormProps) => {
  
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
    dataNascimento: '',
    telefone: '',
    endereco: {
      cep: '',
      logradouro: '',
      bairro: '',
      estado: '',
      localidade: '',
      complemento: ''
    }
  });

  // Função para fazer a requisição ao ViaCep
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cep = e.target.value;
  
    // Remover o traço caso o usuário insira sem ele
    cep = cep.replace(/\D/g, ''); // Remove tudo que não seja número
  
    // Atualize o estado do CEP sem o traço
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        cep: cep,
      },
    }));
  
    // Apenas busca o CEP se o CEP tiver 8 dígitos
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
  
        if (!data.erro) {
          setCliente((prev) => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              logradouro: data.logradouro || '',
              bairro: data.bairro || '',
              estado: data.uf || '',
              localidade: data.localidade || '',
              // Formatar o CEP com o traço para exibição
              cep: `${cep.substring(0, 5)}-${cep.substring(5)}`,
            },
          }));
        } else {
          alert('CEP inválido');
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar informações do CEP');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value,
      },
    }));
  };

  const handleEstadoChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        estado: value, // Estado alterado para o valor selecionado
      },
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(cliente.email) || !isValidTelefone(cliente.telefone)) {
      alert('Email ou telefone inválidos!');
      return;
    }
    onSubmit(cliente);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Criar Cliente</h2>
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="sobrenome"
          value={cliente.sobrenome}
          onChange={handleChange}
          placeholder="Sobrenome"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="dataNascimento"
          value={cliente.dataNascimento}
          onChange={handleChange}
          placeholder="Data de nascimento"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="endereco"
          value={"Informações do Endereço: "}
          style={{ fontSize: '18px', fontWeight: 'bold' }}
          readOnly
          className="mb-2 w-full p-2 text-gray-700 bg-gray-100"
        />
        <input
          type="text"
          name="cep"
          value={cliente.endereco.cep}
          onChange={handleCepChange}
          placeholder="CEP"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="logradouro"
          value={cliente.endereco.logradouro}
          onChange={handleEnderecoChange}
          placeholder="Logradouro"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="bairro"
          value={cliente.endereco.bairro}
          onChange={handleEnderecoChange}
          placeholder="Bairro"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <FormControl fullWidth className="mb-2">
          <InputLabel id="estado-label">Estado</InputLabel>
          <Select
            labelId="estado-label"
            id="estado"
            name="estado"
            value={cliente.endereco.estado}
            onChange={handleEstadoChange}
            label="Estado" 
            required
          >
            {estados.map((estado) => (
              <MenuItem key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input
          type="text"
          name="localidade"
          value={cliente.endereco.localidade}
          onChange={handleEnderecoChange}
          placeholder="Cidade"
          className="p-2 mb-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="complemento"
          value={cliente.endereco.complemento}
          onChange={handleEnderecoChange}
          placeholder="Complemento"
          className="p-2 mb-2 border rounded w-full"
          required
        /> 
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Salvar Cliente
        </button>
      </form>
    </div>
  );
};

// Criar cidade (localidade) e complemento
export default ClienteForm;
