import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const GridResultado = ({
  isLoading,
  result,
  getAlertSeverity,
  handleCopy,
  copyText,
}) => {
  return (
    <Grid
      size={{ xs: 12, md: 6 }}
      sx={{
        margin: {
          xs: "16px 8px",
          md: 0,
        },
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: "24px 32px",
          height: "100%",
          margin: "4px 0 48px 0",
        }}
      >
        <Typography variant="h5" component="h2" sx={{ textAlign: "center" }}>
          Resultado da Análise
        </Typography>

        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!isLoading && !result && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              minHeight: "200px",
              color: "text.secondary", // Cor mais suave que #FFF
              textAlign: "center",
              padding: 3,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: "3rem", mb: 2, opacity: 0.7 }} />

            <Typography variant="h6" component="p">
              Pronto para analisar
            </Typography>

            {/* 3. TEXTO SECUNDÁRIO (CONTEXTO) */}
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Basta inserir seu texto ou arquivo e clicar em "Analisar".
            </Typography>
          </Box>
        )}

        {!isLoading && result && (
          <Box>
            <Typography variant="overline">Categoria</Typography>
            <Alert
              sx={{ marginBottom: 2, alignItems: "center" }}
              severity={getAlertSeverity(result.categoria)}
            >
              <Typography variant="h6" component="strong">
                {result.categoria}
              </Typography>
            </Alert>

            <Typography variant="overline" sx={{ marginTop: 2 }}>
              Resposta Sugerida
            </Typography>
            {/* A <pre> para a resposta */}
            <Box
              component="pre"
              sx={{
                backgroundColor: "#121212",
                padding: 2,
                margin: 0,
                border: "1px solid #ddd",
                borderRadius: 1,
                whiteSpace: "pre-wrap", // Faz o texto quebrar linha
                wordBreak: "break-word", // Quebra palavras longas
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              {result.resposta_sugerida}
            </Box>
            <Button
              size="small"
              onClick={handleCopy}
              sx={{
                color: "#fff",
                border: "1px solid #fff",
                float: "right",
                marginTop: "8px",
              }}
              variant="contained"
            >
              <ContentCopyIcon />
              <Typography variant="overline">{copyText}</Typography>
            </Button>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};
