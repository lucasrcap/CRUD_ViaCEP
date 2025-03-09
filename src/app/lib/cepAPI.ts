interface CepResponse {
    cep: string;
    logradouro: string;
    bairro: string;
    estado: string;
    localidade: string;
    complemento: string;
    uf: string;
    erro?: boolean;  // Torna o erro opcional
  }
  
  const VIA_CEP_URL = 'https://viacep.com.br/ws';
  
  export const buscarEnderecoPorCep = async (cep: string): Promise<CepResponse> => {
    const response = await fetch(`${VIA_CEP_URL}/${cep}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar endereço');
    }
  
    const data: CepResponse = await response.json();
    if (data.erro) {
      throw new Error('CEP não encontrado');
    }
    return data;
  };
  