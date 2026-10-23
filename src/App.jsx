
import { Box, Container, Typography, Button, Paper } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
          >
            Welcome to Finora
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Your personal finance journey starts here.
            Track your income, manage your expenses, and
            understand your spending habits.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => alert("Your Finora app is ready!")}
          >
            Get Started
          </Button>
        </Paper>
      </Container>
    </Box>

  );
}

export default App
