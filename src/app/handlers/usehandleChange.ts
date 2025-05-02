import { maskTelefoneCelular, maskDataNascimento } from "../utils/formatters";
import { Cliente } from "../models/Cliente";  // Importa o tipo Cliente

export const useHandleChange = (
  setCliente: React.Dispatch<React.SetStateAction<Cliente>> // Definindo o tipo corretamente aqui
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCliente((prev: Cliente) => {  // Agora 'prev' tem o tipo 'Cliente'
      if (name === "telefone") {
        return {
          ...prev,
          telefone: maskTelefoneCelular(value.replace(/\D/g, "")),
        };
      } else if (name === "dataNascimento") {
        return {
          ...prev,
          dataNascimento: maskDataNascimento(value),
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  return { handleChange };
};
