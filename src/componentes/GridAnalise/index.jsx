import {
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Divider,
  Chip,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
export const GridAnalise = ({
  emailText,
  setEmailText,
  selectedFile,
  setSelectedFile,
  handleSubmit,
  setFileName,
  isLoading,
  fileName,
  handleUploadClick,
  handleFileChange,
  fileInputRef,
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
      <Paper elevation={2} sx={{ padding: "24px 32px", height: "100%" }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Analisar Email
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            component="div"
            sx={{ marginBottom: 2, display: "flex", flexDirection: "column" }}
          >
            <TextField
              fullWidth
              multiline
              rows={7}
              variant="outlined"
              placeholder="Cole o corpo do email aqui ou faça o upload de um arquivo..."
              value={emailText}
              onChange={(e) => {
                setEmailText(e.target.value);
                if (selectedFile) {
                  setSelectedFile(null);
                  setFileName("");
                }
              }}
            />
            <Divider sx={{ marginY: 2 }}>
              <Typography variant="overline">OU</Typography>
            </Divider>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginBottom: 2,
                minHeight: "70px",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleUploadClick}
                sx={{
                  color: "#fff",
                  width: "50%",
                  border: "1px solid #fff",
                }}
              >
                Fazer upload
                <UpgradeIcon />
              </Button>
              {/* Mostra o nome do arquivo selecionado */}
              {fileName && (
                <Chip
                  label={fileName}
                  onDelete={() => {
                    setSelectedFile(null);
                    setFileName("");
                  }}
                  sx={{ marginTop: 1, fontSize: "0.75rem", maxWidth: "100%" }}
                />
              )}
            </Box>
          </Box>

          {/* Input de arquivo escondido */}
          <input
            type="file"
            accept=".txt,.pdf"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <Button
            fullWidth
            variant="contained"
            size="medium"
            type="submit"
            disabled={isLoading || (!emailText && !selectedFile)}
            sx={{
              height: "48px",
              border: "1px solid #fff",
              width: "80%",
              mx: "auto",
              display: "flex",
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Analisar"}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
