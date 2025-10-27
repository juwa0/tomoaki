// src/App.tsx
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import LandingPage from "./components/LandingPage";
import TextInputForm from "./components/TextInputForm";
import StylePreferences from "./components/StylePreferences";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        {/* Landing Page at root */}
        <Route path="/" element={<LandingPage />} />

        {/* Stylist page at /stylist */}
        <Route path="/stylist" element={<TextInputForm />} />

        {/* Preferences page */}
        <Route path="/preferences" element={<StylePreferences />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
