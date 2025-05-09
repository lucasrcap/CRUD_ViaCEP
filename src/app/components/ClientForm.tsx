import { useEffect, useState } from "react";
import { Cliente } from "../models/Cliente";
import {isValidDataNascimento, isValidEmail, isValidTelefone,} from "../utils/validators";
import { useHandleChange } from "../handlers/usehandleChange";
import { useEnderecoChange } from "../handlers/useEnderecoChange";
import { useCepChange } from "../handlers/useCepChange";
import { useEstadoChange } from "../handlers/useEstadoChange";
import { useHandleNext } from "../handlers/useHandleNext";
import { useHandleSubmit } from "../handlers/useHandleSubmit";
import { inputStyle } from "../styles/inputStyles";
import { estados } from "../utils/estados";
import {
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Grid,
  Button,
  Typography,
  Step,
  StepLabel,
  Stepper,
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

  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // Estado para gerenciar as etapas
  const [formErrors, setFormErrors] = useState<any>({
    nome: false,
    sobrenome: false,
    email: false,
    telefone: false,
    dataNascimento: false,
  }); // Estado para armazenar erros de validação para cada campo
  const [isNextClicked, setIsNextClicked] = useState(false); // Estado para controlar quando o botão "Próxima" é pressionado
  const steps = ["Informações Pessoais", "Informações de Endereço"]; // Definição das etapas

  const { handleChange } = useHandleChange(setCliente);
  const { handleEnderecoChange } = useEnderecoChange(setCliente)
  const { handleCepChange } = useCepChange(setCliente)
  const { handleEstadoChange } = useEstadoChange(setCliente)
  const { validateStepOne } = useHandleNext(); // Função chamada ao pressionar o botão "Próxima"

  const handleNext = () => {
    setIsNextClicked(true);
    const { isValid, errors } = validateStepOne(cliente);

  setFormErrors(errors);
    if (!isValid) {
      setIsError(true);
      return;
    }

  setIsError(false);
  setActiveStep((prev) => prev + 1);
  };

  // Função de submit
  const resetCliente = () =>
    setCliente({
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
  
  const handleSubmit = useHandleSubmit({
    cliente,
    setIsError,
    setFeedbackMessage,
    onSubmit,
    resetCliente,
    setOpenAlert,
    setActiveStep,
  });

  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(""); // Limpa a mensagem depois de 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpa o timeout se o componente for desmontado antes
    }
  }, [feedbackMessage]);


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
        {/* Stepper para navegação entre as etapas */}
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Seção de Informações Pessoais */}
        {activeStep === 0 && (
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
                />
                {isNextClicked && formErrors.nome && (
                  <Alert severity="warning">Nome é obrigatório</Alert>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  type="text"
                  name="sobrenome"
                  value={cliente.sobrenome}
                  onChange={handleChange}
                  placeholder="Sobrenome"
                  style={inputStyle}
                />
                {isNextClicked && formErrors.sobrenome && (
                  <Alert severity="warning">Sobrenome é obrigatório</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  type="email"
                  name="email"
                  value={cliente.email}
                  onChange={handleChange}
                  placeholder="Email"
                  style={inputStyle}
                />
                {isNextClicked && formErrors.email && (
                  <Alert severity="error">{formErrors.email}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                  placeholder="Telefone"
                  style={inputStyle}
                />
                {isNextClicked && formErrors.telefone && (
                  <Alert severity="error">{formErrors.telefone}</Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <input
                  type="text"
                  name="dataNascimento"
                  value={cliente.dataNascimento}
                  onChange={handleChange}
                  placeholder="Data de nascimento"
                  style={inputStyle}
                />
                {isNextClicked && formErrors.dataNascimento && (
                  <Alert severity="error">{formErrors.dataNascimento}</Alert>
                )}
              </Grid>
            </Grid>
            {/* Botões da seção de informações pessoais */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setCliente({
                    ...cliente,
                    nome: "",
                    sobrenome: "",
                    email: "",
                    telefone: "",
                    dataNascimento: "",
                  })
                }
              >
                Apagar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Próxima
              </Button>
            </Box>
          </Box>
        )}

        {/* Seção de Informações de Endereço */}
        {activeStep === 1 && (
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
            />
            {/* Botões da seção de informações de endereço */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setActiveStep(0)} // Voltar para a seção de informações pessoais
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setCliente({
                    ...cliente,
                    endereco: {
                      cep: "",
                      logradouro: "",
                      bairro: "",
                      estado: "",
                      localidade: "",
                      complemento: "",
                    },
                  })
                }
              >
                Apagar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Salvar Cliente
              </Button>
            </Box>
          </Box>
        )}

        {/* Exibindo mensagem de erro ou sucesso */}
        {feedbackMessage && (
          <Alert severity={isError ? "error" : "success"} sx={{ mt: 2 }}>
            {feedbackMessage}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default ClienteForm;