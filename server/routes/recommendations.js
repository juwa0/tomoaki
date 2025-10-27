// server/routes/recommendations.js
const express = require('express');
const router = express.Router();
const ClothingItem = require('../models/ClothingItem');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const {
      userDescription,
      colorPreference,
      occasion,
      preferredStyle,
      gender,
      typicalStyle,
      colors,
      inspirations,
      notes,
    } = req.body;

    // (Optional) Validate request
    if (!userDescription) {
      return res.status(400).json({ error: 'userDescription is required' });
    }

    // Optional: allow a mock fallback via env for demos or when quota is unavailable
    if (process.env.USE_MOCK_AI === 'true') {
      const mock = [
        {
          item: {
            _id: `${Date.now()}-0`,
            name: 'Casual Layered Look',
            description: 'A breathable cotton tee with a light denim jacket and tapered chinos.',
            attributes: { color: 'blue', category: 'casual', style: 'streetwear' }
          },
          similarity: 0.82
        },
        {
          item: {
            _id: `${Date.now()}-1`,
            name: 'Business Casual',
            description: 'Oxford shirt, navy blazer, dark jeans, and minimalist sneakers.',
            attributes: { color: 'navy', category: 'smart casual', style: 'business casual' }
          },
          similarity: 0.77
        },
        {
          item: {
            _id: `${Date.now()}-2`,
            name: 'Evening Chic',
            description: 'Silky blouse with high-waisted trousers and statement heels.',
            attributes: { color: 'black', category: 'evening', style: 'elegant' }
          },
          similarity: 0.74
        }
      ];
      return res.json({ recommendations: mock });
    }

    // Call OpenAI to generate structured outfit recommendations
    const systemPrompt = `You are a helpful virtual fashion stylist.
If user preferences are provided (preferred style, gender, typical style, colors, inspirations, notes), prioritize aligning suggestions to them (tone, vibe, silhouette, and attributes) while keeping options wearable.
Return a JSON object with a single field "recommendations" which is an array of 3 to 5 items.
Each item must have: name (string), description (string), attributes (object with optional color, category, style), and similarity (number from 0 to 1).
Do not include any additional fields or commentary.`;

    const userPrompt = `User description: ${userDescription}
${preferredStyle ? `Preferred style (free text): ${preferredStyle}` : ''}
${typicalStyle ? `Typical style: ${typicalStyle}` : ''}
${gender ? `Gender: ${gender}` : ''}
${colors ? `Colors they like to wear: ${colors}` : ''}
${inspirations ? `Fashion inspirations: ${inspirations}` : ''}
${notes ? `Other notes: ${notes}` : ''}
${colorPreference ? `Color preference (app): ${colorPreference}` : ''}
${occasion ? `Occasion: ${occasion}` : ''}`.trim();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    });

    const content = completion.choices?.[0]?.message?.content || '{}';
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error('Failed to parse JSON from OpenAI:', content);
      return res.status(502).json({ error: 'Bad response from AI service' });
    }

    const rawRecs = Array.isArray(parsed.recommendations) ? parsed.recommendations : [];
    // Map to client shape: { item: { _id, name, description, attributes }, similarity }
    const recommendations = rawRecs.map((r, idx) => ({
      item: {
        _id: `${Date.now()}-${idx}`,
        name: r.name || `Recommendation ${idx + 1}`,
        description: r.description || '',
        attributes: r.attributes || {}
      },
      similarity: typeof r.similarity === 'number' ? Math.max(0, Math.min(1, r.similarity)) : 0.5
    }));

    return res.json({ recommendations });
  } catch (error) {
    // Handle OpenAI quota/429 errors gracefully with optional mock fallback
    const status = error?.status || error?.response?.status;
    const code = error?.code || error?.response?.data?.error?.code;
    if (status === 429 || code === 'insufficient_quota') {
      console.warn('OpenAI quota/429 encountered:', code || status);
      if (process.env.USE_MOCK_AI === 'true') {
        const mock = [
          {
            item: {
              _id: `${Date.now()}-m0`,
              name: 'Quota Fallback: Smart Layers',
              description: 'Textured knit over a crisp tee with relaxed trousers.',
              attributes: { color: 'grey', category: 'casual', style: 'minimal' }
            },
            similarity: 0.7
          }
        ];
        return res.json({ recommendations: mock });
      }
      return res.status(503).json({ error: 'AI temporarily unavailable (quota). Please try again later.' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
