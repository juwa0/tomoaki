// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e", // green-500
      light: "#86efac",
      dark: "#16a34a",
      contrastText: "#0b1f16",
    },
    secondary: {
      main: "#10b981", // emerald
      light: "#6ee7b7",
      dark: "#059669",
      contrastText: "#052e22",
    },
    background: {
      default: "#0b1f16",
    },
    text: {
      primary: "#e6fff0",
    },
  },
  typography: {
    // Default font for body text
    fontFamily: "Nunito, Arial, sans-serif",

    // Heading overrides (e.g., h4)
    h4: {
      fontFamily: "Oswald, Arial, sans-serif",
      fontSize: "2rem",
      letterSpacing: "1px",
      color: "#e8f5e9",
      fontWeight: 600,
    },
    // Example for h5
    h5: {
      fontFamily: "Oswald, Arial, sans-serif",
      fontSize: "1.6rem",
      color: "#d1fae5",
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // slightly rounded corners (less "cute" than 20px)
          textTransform: "none", // no uppercase transform, for a cleaner look
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #10b981 100%)",
          color: "#052e22",
          boxShadow: "0 10px 24px rgba(34,197,94,0.25)",
          '&:hover': {
            background: "linear-gradient(135deg, #16a34a 0%, #0ea5a0 100%)",
            boxShadow: "0 12px 28px rgba(16,185,129,0.35)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6, // moderately rounded
          fontFamily: "Nunito, Arial, sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        },
      },
    },
  },
});

export default theme;
