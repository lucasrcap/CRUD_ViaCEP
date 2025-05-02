import { Cliente } from "../models/Cliente";  // Importa o tipo Cliente

export const useCepChange = (
  setCliente: React.Dispatch<React.SetStateAction<Cliente>>
) => {
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cep = e.target.value;
    cep = cep.replace(/\D/g, ""); // Remove tudo que não seja número

    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        cep: cep,
      },
    }));

    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setCliente((prev) => ({
            ...prev,
            endereco: {
              ...prev.endereco,
              logradouro: data.logradouro || "",
              bairro: data.bairro || "",
              estado: data.uf || "",
              localidade: data.localidade || "",
              cep: `${cep.substring(0, 5)}-${cep.substring(5)}`,
            },
          }));
        } else {
          alert("CEP inválido");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        alert("Erro ao buscar informações do CEP");
      }
    }
  };

  return { handleCepChange };
};
