import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Box,
  createTheme,
  keyframes,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";

import { Titulo } from "./componentes/Titulo";
import { GridAnalise } from "./componentes/GridAnalise";
import { GridResultado } from "./componentes/GridResultado";
import { Rodape } from "./componentes/Rodape";

const moveLights = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const darkTheme = createTheme({
  palette: {
    // A 'mágica' do dark mode!
    mode: "dark",

    // Fundo principal (quase preto)
    background: {
      default: "#000",
      paper: "#121212", // Cor dos 'cards'
    },

    primary: {
      main: "#121212",
    },
  },
});

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [copyText, setCopyText] = useState("Copiar Resposta");

  // Ref para o input de arquivo (para podermos "clicá-lo" com um botao)
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);
    setCopyText("Copiar Texto"); // Reseta o botao de copiar

    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else if (emailText) {
      formData.append("emailText", emailText);
    } else {
      setIsLoading(false);
      return;
    }

    try {
      // ! vamos trocar esta URL no deploy
      const response = await fetch(
        "https://assistente-email-python.onrender.com/process-email",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      // Tratamento de erro
      if (response.status !== 200 || data.error) {
        setResult({
          categoria: "Erro",
          resposta_sugerida: data.error || "Falha ao processar a solicitação.",
        });
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setResult({
        categoria: "Erro de Rede",
        resposta_sugerida:
          "Não foi possível conectar ao servidor. Verifique se o backend (Python) está rodando.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result || !result.resposta_sugerida) return;
    navigator.clipboard.writeText(result.resposta_sugerida);
    setCopyText("Copiado!");
    setTimeout(() => setCopyText("Copiar Texto"), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name); // Guarda o nome do arquivo para mostrar
      if (emailText) setEmailText("");
    }
  };

  const handleUploadClick = () => {
    // "Clica" no input de arquivo escondido
    fileInputRef.current.click();
  };

  const getAlertSeverity = (categoria) => {
    if (categoria === "Produtivo") return "success";
    if (categoria === "Improdutivo") return "info";
    if (
      categoria === "Erro" ||
      categoria === "Erro de Rede" ||
      categoria === "Erro de IA"
    )
      return "error";
    return "warning";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Este Box é a sua camada de "luzes animadas" */}
      <Box
        sx={{
          position: "fixed", // Fica fixo no fundo
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Fica *atrás* de todo o conteúdo

          // As "luzes" (gradientes radiais sutis)
          backgroundImage: `linear-gradient(120deg, 
            hsla(0, 100%, 50%, 0.15), 
            hsla(45, 100%, 50%, 0.15), 
            hsla(90, 100%, 50%, 0.15), 
            hsla(135, 100%, 50%, 0.15),
            hsla(180, 100%, 50%, 0.15),
            hsla(225, 100%, 50%, 0.15),
            hsla(270, 100%, 50%, 0.15),
            hsla(315, 100%, 50%, 0.15)
          )`,
          backgroundSize: "400% 400%", // Deixa o gradiente maior que a tela

          // Aplica a animação
          animation: `${moveLights} 20s ease-in-out infinite`,
        }}
      />
      <Container maxWidth="100%" sx={{ margin: 0, padding: "16px" }}>
        {/* Titulo */}
        <Titulo />

        {/* grid para dividir a analise do resultado*/}
        <Grid container spacing={5}>
          {/* analise */}
          <GridAnalise
            emailText={emailText}
            setEmailText={setEmailText}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            handleSubmit={handleSubmit}
            setFileName={setFileName}
            isLoading={isLoading}
            fileName={fileName}
            handleUploadClick={handleUploadClick}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          {/* grid do resultado */}
          <GridResultado
            result={result}
            isLoading={isLoading}
            getAlertSeverity={getAlertSeverity}
            copyText={copyText}
            handleCopy={handleCopy}
          />
        </Grid>

        {/* Rodapé */}
        <Rodape />
      </Container>
    </ThemeProvider>
  );
}

export default App;
