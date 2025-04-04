// Função para formatar o telefone
export const formatTelefone = (telefone: string): string => {
    return telefone.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1) $2-$3'
    );
  };

  