import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type StylePrefs = {
  gender?: string;
  typicalStyle?: string;
  colors?: string;
  inspirations?: string;
  notes?: string;
};

const StylePreferences: React.FC = () => {
  const [prefs, setPrefs] = useState<StylePrefs>({
    gender: "",
    typicalStyle: "",
    colors: "",
    inspirations: "",
    notes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedObj = localStorage.getItem("stylePreferences");
    if (savedObj) {
      try {
        const parsed = JSON.parse(savedObj);
        setPrefs({
          gender: parsed.gender || "",
          typicalStyle: parsed.typicalStyle || "",
          colors: parsed.colors || "",
          inspirations: parsed.inspirations || "",
          notes: parsed.notes || "",
        });
        return;
      } catch {}
    }
    const legacy = localStorage.getItem("preferredStyle");
    if (legacy) {
      setPrefs((p) => ({ ...p, typicalStyle: legacy }));
    }
  }, []);

  const handleSave = () => {
    const data: StylePrefs = {
      gender: prefs.gender?.trim() || "",
      typicalStyle: prefs.typicalStyle?.trim() || "",
      colors: prefs.colors?.trim() || "",
      inspirations: prefs.inspirations?.trim() || "",
      notes: prefs.notes?.trim() || "",
    };
    localStorage.setItem("stylePreferences", JSON.stringify(data));
    navigate("/stylist");
  };

  const handleClear = () => {
    setPrefs({ gender: "", typicalStyle: "", colors: "", inspirations: "", notes: "" });
    localStorage.removeItem("stylePreferences");
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2, maxWidth: 700, margin: "auto" }}>
      <Typography variant="h4">Your usual fashion style</Typography>
      <Typography variant="body1">
        Answer these prompts to help tailor recommendations. All fields are optional and free-form.
      </Typography>

      <TextField
        label="What is your gender?"
        placeholder="e.g., woman, man, non-binary"
        value={prefs.gender}
        onChange={(e) => setPrefs((p) => ({ ...p, gender: e.target.value }))}
        sx={{
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
        }}
      />

      <TextField
        label="What is your typical style? (Streetwear, comfy, y2k, casual, grunge, avant garde, etc.)"
        placeholder="e.g., casual minimalist; y2k with metallics; comfy streetwear"
        value={prefs.typicalStyle}
        onChange={(e) => setPrefs((p) => ({ ...p, typicalStyle: e.target.value }))}
        multiline
        minRows={2}
        sx={{
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
        }}
      />

      <TextField
        label="What colors do you like to wear?"
        placeholder="e.g., black and grey; blue with black; earth tones; pastels"
        value={prefs.colors}
        onChange={(e) => setPrefs((p) => ({ ...p, colors: e.target.value }))}
        sx={{
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
        }}
      />

      <TextField
        label="Who are your fashion inspirations?"
        placeholder="e.g., Rick Owens, Zendaya, Tyler, the Creator, 90s runway, TikTok creators"
        value={prefs.inspirations}
        onChange={(e) => setPrefs((p) => ({ ...p, inspirations: e.target.value }))}
        multiline
        minRows={2}
        sx={{
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
        }}
      />

      <TextField
        label="Include any other notes you want to put here!"
        placeholder="e.g., prefer sustainable brands; budget-friendly; petite sizes; no leather"
        value={prefs.notes}
        onChange={(e) => setPrefs((p) => ({ ...p, notes: e.target.value }))}
        multiline
        minRows={3}
        sx={{
          '& .MuiInputBase-input': { color: '#ffffff' },
          '& .MuiInputLabel-root': { color: '#ffffff' },
          '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
        }}
      />

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save and continue
        </Button>
        <Button variant="text" color="inherit" onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default StylePreferences;
