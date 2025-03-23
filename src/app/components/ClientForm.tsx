import { useState } from "react";
import { Cliente } from "../types/ClientD";
import {
  isValidDataNascimento,
  isValidEmail,
  isValidTelefone,
} from "../utils/validators";
import { estados } from "../utils/estados";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Grid,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

interface ClienteFormProps {
  onSubmit: (cliente: Cliente) => void;
}

const ClienteForm = ({ onSubmit }: ClienteFormProps) => {
  const [cliente, setCliente] = useState<Cliente>({
    id: 0,
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: "",
    telefone: "",
    endereco: {
      cep: "",
      logradouro: "",
      bairro: "",
      estado: "",
      localidade: "",
      complemento: "",
    },
  });

  const [showEndereco, setShowEndereco] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  // Função para manipular mudanças nos campos do cliente
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Função para manipular mudanças no endereço
  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        [name]: value,
      },
    }));
  };

  // Função para manipular a mudança do CEP
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let cep = e.target.value;

    // Remover o traço caso o usuário insira sem ele
    cep = cep.replace(/\D/g, ""); // Remove tudo que não seja número

    // Atualize o estado do CEP sem o traço
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        cep: cep,
      },
    }));

    // Apenas busca o CEP se o CEP tiver 8 dígitos
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
              // Formatar o CEP com o traço para exibição
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

  // Função para manipular a mudança no estado
  const handleEstadoChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        estado: value, // Estado alterado para o valor selecionado
      },
    }));
  };

  // Função de submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(cliente.email)) {
      setIsError(true);
      setFeedbackMessage("Email inválido!");
      return;
    }

    if (!isValidTelefone(cliente.telefone)) {
      setIsError(true);
      setFeedbackMessage(
        "Telefone inválido! Formato esperado: (XX) XXXXX-XXXX"
      );
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
  };

  // Manipulador para a seleção do radio
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setShowEndereco(value === "endereco");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* Radio Buttons para alternar entre as seções */}
        <RadioGroup
          aria-labelledby="endereco-radio-group"
          value={showEndereco ? "endereco" : "pessoal"}
          onChange={handleRadioChange}
          row
          sx={{ marginBottom: "16px", justifyContent: "center" }}
        >
          <FormControlLabel
            value="pessoal"
            control={<Radio />}
            label="Informações Pessoais"
          />
          <FormControlLabel
            value="endereco"
            control={<Radio />}
            label="Informações de Endereço"
          />
        </RadioGroup>

        {/* Seção de Informações Pessoais */}
        {!showEndereco && (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              Informações Pessoais
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleChange}
                  placeholder="Nome"
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  name="sobrenome"
                  value={cliente.sobrenome}
                  onChange={handleChange}
                  placeholder="Sobrenome"
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="email"
                  name="email"
                  value={cliente.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  style={inputStyle}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="dataNascimento"
                  value={cliente.dataNascimento}
                  onChange={handleChange}
                  placeholder="Data de nascimento"
                  style={inputStyle}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Seção de Informações de Endereço - Quando selecionado no radio */}
        {showEndereco && (
          <Box>
            <Typography variant="h6" align="center" gutterBottom>
              Informações de Endereço
            </Typography>
            <input
              type="text"
              name="cep"
              value={cliente.endereco.cep}
              onChange={handleCepChange}
              placeholder="CEP"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="logradouro"
              value={cliente.endereco.logradouro}
              onChange={handleEnderecoChange}
              placeholder="Logradouro"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="bairro"
              value={cliente.endereco.bairro}
              onChange={handleEnderecoChange}
              placeholder="Bairro"
              style={inputStyle}
              required
            />
            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                name="estado"
                value={cliente.endereco.estado}
                onChange={handleEstadoChange}
                label="Estado"
                required
              >
                {estados.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <input
              type="text"
              name="localidade"
              value={cliente.endereco.localidade}
              onChange={handleEnderecoChange}
              placeholder="Cidade"
              style={inputStyle}
              required
            />
            <input
              type="text"
              name="complemento"
              value={cliente.endereco.complemento}
              onChange={handleEnderecoChange}
              placeholder="Complemento"
              style={inputStyle}
              required
            />

            {/* Exibindo a mensagem de erro ou sucesso */}
            {feedbackMessage && (
              <Typography
                variant="body2"
                align="center"
                style={{
                  marginTop: "16px",
                  color: isError ? "red" : "green",
                  fontWeight: "bold",
                }}
              >
                {feedbackMessage}
              </Typography>
            )}

            {/* Botão de Enviar */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "24px" }}
            >
              Salvar Cliente
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "14px",
};

export default ClienteForm;
