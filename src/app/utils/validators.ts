import dayjs from "dayjs";

// Função para validar um endereço de e-mail
export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Função para validar o formato de um telefone
export const isValidTelefone = (telefone: string): boolean => {
  const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(telefone);
};

// Função de validação para data de nascimento
  export const isValidDataNascimento = (data: Date): boolean => {
  const parsedDate = dayjs(data, "DD/MM/YYYY", true);
  // Verifica se a data está no formato válido "DD/MM/YYYY" ou "YYYY-MM-DD"
  const isValidDateFormat = parsedDate.isValid();
  const isBeforeToday = parsedDate.isBefore(dayjs(), 'day');
  // Verifica se a data é válida e se é anterior à data atual
  return isValidDateFormat && isBeforeToday;
};

// Função para formatar data no padrão brasileiro (dd/mm/yyyy)
export const formatDateBR = (date: string | Date): string => {
  if (!date) return '';
  return dayjs(date).format('DD/MM/YYYY');
};
