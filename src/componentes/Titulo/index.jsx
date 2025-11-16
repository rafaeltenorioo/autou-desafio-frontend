import { Typography, Box } from "@mui/material";
export const Titulo = () => {
  return (
    <Box sx={{ textAlign: "center", marginBottom: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: "2.5rem",
            md: "3.5rem",
          },
        }}
      >
        Assistente de Email da Nexus Finanças
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Classificação e resposta com IA
      </Typography>
    </Box>
  );
};
