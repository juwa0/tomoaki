// server/routes/textUpload.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { userDescription } = req.body;
  if (!userDescription) {
    return res.status(400).json({ error: 'No description provided' });
  }

  // Here, you can parse the text, do NLP, or store it in DB
  // For example:
  console.log('User description received:', userDescription);

  // Return a simple success message
  return res.json({ message: 'Text received', parsedAttributes: {} });
});

module.exports = router;
