import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, TextField, Button, Typography, List, ListItem, Chip, LinearProgress } from "@mui/material";

interface RecommendedItem {
  item: {
    _id: string;
    name: string;
    description: string;
    attributes: {
      color?: string;
      category?: string;
      style?: string;
    };
  };
  similarity: number;
}

// Example array of ideas with a color field you can apply
const SUGGESTED_IDEAS = [
  { text: "Rainy day today, what should I pair with my yellow raincoat?", color: "#90caf9" },
  { text: "Big party tonight, want to wear something flashy!", color: "#f48fb1" },
  { text: "What should I pair with my favorite blue jeans?", color: "#a5d6a7" },
  { text: "I need an outfit for date night!", color: "#ce93d8" },
  { text: "I need a business casual outfit for a meeting.", color: "#ffcc80" },
];

const TextInputForm: React.FC = () => {
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferredStyle, setPreferredStyle] = useState<string | null>(null);
  const [stylePrefs, setStylePrefs] = useState<{
    gender?: string;
    typicalStyle?: string;
    colors?: string;
    inspirations?: string;
    notes?: string;
  } | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleGetRecommendations = async () => {
    try {
      setLoading(true);
      setRecommendations([]);
      setError(null);

      const trimmedStyle = (preferredStyle || "").trim();
      const response = await axios.post("/api/recommendations", {
        userDescription: description,
        preferredStyle: trimmedStyle ? trimmedStyle : undefined,
        gender: stylePrefs?.gender?.trim() || undefined,
        typicalStyle: stylePrefs?.typicalStyle?.trim() || undefined,
        colors: stylePrefs?.colors?.trim() || undefined,
        inspirations: stylePrefs?.inspirations?.trim() || undefined,
        notes: stylePrefs?.notes?.trim() || undefined,
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      const message =
        (axios.isAxiosError(error) && error.response?.data?.error) ||
        "Sorry, I couldn't fetch recommendations right now.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleIdeaClick = (idea: string) => {
    // append the idea to the current description
    setDescription(prev => prev ? prev + ", " + idea : idea);
  };

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (!loading && recommendations.length > 0) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, recommendations]);

  // Load saved preferred style
  useEffect(() => {
    const saved = localStorage.getItem("preferredStyle");
    if (saved && saved.trim()) setPreferredStyle(saved.trim());
    const savedObj = localStorage.getItem("stylePreferences");
    if (savedObj) {
      try {
        const parsed = JSON.parse(savedObj);
        setStylePrefs(parsed);
        if (parsed?.typicalStyle && !saved) setPreferredStyle(String(parsed.typicalStyle));
      } catch {}
    }
  }, []);

  return (
    <Box sx={{ p: 6, display: "flex", flexDirection: "column", gap: 2, maxWidth: 900, mx: "auto" }}>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #86efac 0%, #22c55e 40%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 800,
              }}
            >
              Hello, I'm Tomoaki!
            </Typography>

            <Box
              component="img"
              sx={{
                width: "85%",
                maxWidth: 520,
                borderRadius: 3,
                boxShadow: 6,
                alignSelf: "center",
              }}
              src="/images/doggy.jpeg"
              alt="Fashion splash"
            />

            <Typography variant="body1" gutterBottom>
              I'm a stylist who can help you find the perfect clothing for you. 
              You can ask me what to wear with your favorite shirt, for a cloudy day,
              for your next dinner party, or anything else! 
              I will do my best to help you arrive fashionably on time :D
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              Need some inspiration? Try these ideas:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {SUGGESTED_IDEAS.map((ideaObj) => (
                <Chip
                  key={ideaObj.text}
                  label={ideaObj.text}
                  variant="outlined"
                  onClick={() => handleIdeaClick(ideaObj.text)}
                  sx={{
                    backgroundColor: ideaObj.color,
                    color: "#0b1f16",
                    borderColor: "#1f6f4b"
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              {stylePrefs ? (
                <>
                  {stylePrefs.gender && <Chip label={stylePrefs.gender} />}
                  {stylePrefs.typicalStyle && <Chip label={stylePrefs.typicalStyle} />}
                  {stylePrefs.colors && <Chip label={stylePrefs.colors} />}
                  {stylePrefs.inspirations && <Chip label={stylePrefs.inspirations} />}
                  {stylePrefs.notes && <Chip label="Notes set" />}
                  <Button component={Link} to="/preferences" size="small" variant="text">Change</Button>
                </>
              ) : preferredStyle ? (
                <>
                  <Typography variant="body2">Your style:</Typography>
                  <Chip label={preferredStyle} />
                  <Button component={Link} to="/preferences" size="small" variant="text">Change</Button>
                </>
              ) : (
                <Button component={Link} to="/preferences" size="small" variant="text">Set your style preferences</Button>
              )}
            </Box>

            <TextField
              label="Ask anything about building your outfit!"
              variant="outlined"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiInputBase-input': { color: '#ffffff', caretColor: '#22c55e' },
                '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.65)' },
                '& .MuiInputLabel-root': { color: '#ffffff' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#22c55e' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.35)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#86efac' },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
              }}
            />

            <Button
        variant="contained"
        color="primary"
        onClick={handleGetRecommendations}
        disabled={!description || loading}
            >
              {loading ? "Loading..." : "Get Recommendations"}
            </Button>

            {loading && <LinearProgress sx={{ mt: 1 }} />}

            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            {recommendations.length > 0 && (
              <Box ref={resultsRef} sx={{ mt: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    background: "linear-gradient(135deg, #86efac 0%, #22c55e 40%, #10b981 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                  }}
                >
                  Recommendations
                </Typography>
                <List>
                  {recommendations.map((rec) => (
                    <ListItem key={rec.item._id}>
                      <Box>
                        <Typography variant="subtitle1">{rec.item.name}</Typography>
                        <Typography variant="body2">
                          {rec.item.description}
                          {rec.item.attributes && (
                            (() => {
                              const parts = [
                                rec.item.attributes.color,
                                rec.item.attributes.category,
                                rec.item.attributes.style,
                              ].filter((v) => !!v) as string[];
                              return parts.length > 0 ? ` ${parts.join(" • ")}` : "";
                            })()
                          )}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
    </Box>
  );
}
;

export default TextInputForm;
