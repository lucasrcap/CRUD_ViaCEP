import { SelectChangeEvent } from "@mui/material";
import { Cliente } from "../models/Cliente";  // Importa o tipo Cliente

export const useEstadoChange = (
  setCliente: React.Dispatch<React.SetStateAction<Cliente>>
) => {
  const handleEstadoChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        estado: value,
      },
    }));
  };
  
  return { handleEstadoChange };
 };
