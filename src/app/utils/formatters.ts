import { IMask } from "react-imask";

// Função para aplicar a máscara à data de nascimento
export const maskDataNascimento = (data: string): string => {
  const masked = IMask.createMask({
    mask: '00/00/0000', // Máscara de data (dd/mm/yyyy)
  });

  masked.resolve(data);
  return masked.value;
};

// funçao para formatar o telefone celular
  export const maskTelefoneCelular = (telefone: string): string => {
    const masked = IMask.createMask({
      mask: '(00) 00000-0000',
    });
  
    masked.resolve(telefone);
    return masked.value;
  }

