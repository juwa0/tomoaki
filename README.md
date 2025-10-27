AI Fashion Stylist ✨🧥👟

Your playful, green-glowing, AI-powered stylist that helps you build outfits for any vibe or event. Ask anything like “date night in fall” or “streetwear with blue jeans,” and get friendly, readable recommendations.

## Features
- **Conversational recommendations**: Plain-English suggestions, not clunky labels.
- **Style preferences**: Free‑text prompts like your typical style, colors, inspirations, notes.
- **Inspiration chips**: One‑click ideas to get you started.
- **Modern UI**: Emerald gradient, floating layout, and clean MUI components.
- **Roadmap: My Closet**: Upload your closet and get combos using your own pieces (anchor item pairing, event/vibe outfits with your images).

## Tech Stack
- **Frontend**: React + Vite + TypeScript, MUI
- **Backend**: Node.js + Express
- **AI**: OpenAI Chat Completions (JSON output)
- **DB**: MongoDB + Mongoose (connected; currently not used by recs in mode C)

## Project Structure
```
client/            # React app (Vite)
  src/
    components/    # UI components (LandingPage, TextInputForm, StylePreferences)
    theme.ts       # MUI theme overrides (emerald vibes)
server/            # Express API
  routes/          # recommendations, upload (scaffolded), etc.
  models/          # ClothingItem (closet model planned)
```

## Quickstart

### 1) Backend
```bash
cd server
npm install
cp .env.example .env   # if you have one; otherwise create .env
# Required:
# OPENAI_API_KEY=sk-...
# Optional demo mode without calling OpenAI:
# USE_MOCK_AI=true
npm run dev
# Server on http://localhost:5001
```

### 2) Frontend
```bash
cd client
npm install
npm run dev
# App on http://localhost:5173
```

## Environment Variables (server/.env)
- `OPENAI_API_KEY` – required for live AI responses.
- `USE_MOCK_AI=true` – return demo recommendations without calling OpenAI.

## Scripts
- `server`: `npm run dev` starts Express on 5001
- `client`: `npm run dev` starts Vite on 5173

## API Overview
- `POST /api/recommendations`
  - Request body (examples):
  ```json
  {
    "userDescription": "Outfit for a fall date night",
    "preferredStyle": "comfy streetwear",          // optional legacy
    "gender": "woman",
    "typicalStyle": "minimalist streetwear",
    "colors": "black, grey, a pop of blue",
    "inspirations": "Zendaya, 90s runway",
    "notes": "no leather"
  }
  ```
  - Response: `{ recommendations: [ { item: { name, description, attributes }, similarity } ] }`

## Roadmap
- **My Closet (planned)**
  - Upload and tag your items (tops, bottoms, shoes, outerwear, accessories).
  - Pick an anchor item (e.g., your favorite jeans) and get **pairings from your closet**.
  - Get **event/vibe outfits** composed only from what you own, using your item images.
  - Start with rule-based pairing; optionally add AI re‑ranking and fun descriptions.

## Styling Notes
- Theme is in `client/src/theme.ts` (emerald gradients, glassy accents).
- Global styles in `client/src/index.css` control the green→black background.

## Contributing
PRs welcome! Try to keep it playful, readable, and user‑friendly. Add screenshots if you make big UI changes.

## License
MIT – use it, remix it, vibe responsibly.

This is a full-stack web application that uses AI to help users find the perfect clothing for them. The application is built using React, Node.js, and MongoDB. 