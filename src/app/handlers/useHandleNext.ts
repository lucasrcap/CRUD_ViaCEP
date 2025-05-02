import { Cliente } from "../models/Cliente";
import { isValidDataNascimento, isValidEmail, isValidTelefone } from "../utils/validators";
import { useState } from "react";

export const useHandleNext = () => {
  const [formErrors, setFormErrors] = useState<any>({});

  const validateStepOne = (cliente: Cliente) => {
    let errors: any = {
      nome: !cliente.nome,
      sobrenome: !cliente.sobrenome,
      email: !cliente.email,
      telefone: !cliente.telefone,
      dataNascimento: !cliente.dataNascimento,
    };

    if (!isValidEmail(cliente.email)) {
      errors.email = "Email inválido!";
    }
    if (!isValidTelefone(cliente.telefone)) {
      errors.telefone = "Telefone inválido! Formato esperado: (XX) XXXXX-XXXX";
    }
    if (!isValidDataNascimento(cliente.dataNascimento)) {
      errors.dataNascimento = "Data de nascimento inválida!";
    }

    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== false);
    return { isValid: !hasErrors, errors };
  };

  return { validateStepOne, formErrors, setFormErrors };
};
