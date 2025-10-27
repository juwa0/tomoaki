// src/components/LandingPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box sx={{ p: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <Box
        component="img"
        sx={{
          width: "85%",
          maxWidth: 520,
          borderRadius: 3,
          boxShadow: 6,
        }}
        src="/images/doggy.jpeg"
        alt="Fashion splash"
      />
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          background: "linear-gradient(135deg, #86efac 0%, #22c55e 40%, #10b981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: 800,
        }}
      >
        Meet Tomoaki, your Personal Stylist!
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 760, textAlign: "center", color: "text.primary" }}>
        Tomoaki helps you find the perfect clothing combinations based on your style preferences.
        Whether you're going out for a casual brunch or attending a fancy dinner party, we’ll help you look your best.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button component={Link} to="/stylist" variant="contained" color="primary">
          Start Styling
        </Button>
        <Button component={Link} to="/preferences" variant="outlined" color="primary">
          Set Style Preferences
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
