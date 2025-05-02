import { Cliente } from "../models/Cliente";  // Importa o tipo Cliente

export const useEnderecoChange = (
  setCliente: React.Dispatch<React.SetStateAction<Cliente>>
) => {
  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCliente((prev: Cliente) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value,  // Atualiza apenas o campo do endereço que mudou
      },
    }));
  };

  return { handleEnderecoChange };
};
