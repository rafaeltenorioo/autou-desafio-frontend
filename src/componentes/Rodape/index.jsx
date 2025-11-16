import { Box, Typography } from "@mui/material";

export const Rodape = () => {
  return (
    <Box sx={{ textAlign: "center", marginTop: 12, color: "text.secondary" }}>
      <Typography variant="caption">
        Assistente da Nexus Finanças | Um Desafio Técnico desenvolvido para
        <Box component="span" fontWeight="bold">
          {" "}
          AutoU{" "}
        </Box>
        por Rafael Tenório.
      </Typography>
    </Box>
  );
};
