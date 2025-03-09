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
  
  // Função para validar a data de nascimento (deve ser uma data passada e no formato YYYY-MM-DD)
  export const isValidDataNascimento = (data: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const dataObj = new Date(data);
    return regex.test(data) && dataObj < new Date();
  };
  