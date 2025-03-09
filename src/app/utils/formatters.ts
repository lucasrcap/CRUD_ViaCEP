// Função para formatar o telefone
export const formatTelefone = (telefone: string): string => {
    return telefone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  };
  
  // Função para formatar o número do cartão de crédito
  export const formatCartao = (numero: string): string => {
    return numero.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/,
      '$1 $2 $3 $4'
    );
  };
  