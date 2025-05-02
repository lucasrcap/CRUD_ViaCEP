// handlers/useHandleSubmit.ts
import { Cliente } from "../models/Cliente";
import { isValidEmail, isValidTelefone, isValidDataNascimento } from "../utils/validators";

interface UseHandleSubmitParams {
  cliente: Cliente;
  setIsError: (value: boolean) => void;
  setFeedbackMessage: (msg: string) => void;
  onSubmit: (cliente: Cliente) => void;
  resetCliente: () => void;
  setOpenAlert: (value: boolean) => void;
  setActiveStep: (step: number) => void;
}

export const useHandleSubmit = ({
  cliente,
  setIsError,
  setFeedbackMessage,
  onSubmit,
  resetCliente,
  setOpenAlert,
  setActiveStep,
}: UseHandleSubmitParams) => {
  return (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(cliente.email)) {
      setIsError(true);
      setFeedbackMessage("Email inválido!");
      return;
    }

    if (!isValidTelefone(cliente.telefone)) {
      setIsError(true);
      setFeedbackMessage("Telefone inválido! Formato esperado: (XX) XXXXX-XXXX");
      return;
    }

    if (!isValidDataNascimento(cliente.dataNascimento)) {
      setIsError(true);
      setFeedbackMessage("Data de nascimento inválida!");
      return;
    }

    setIsError(false);
    setFeedbackMessage("Cliente salvo com sucesso!");
    onSubmit(cliente);
    resetCliente();
    setOpenAlert(true);
    setActiveStep(0);
  };
};
