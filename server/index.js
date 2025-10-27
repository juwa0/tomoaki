// server/index.js
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose'); // Uncomment if using MongoDB
const path = require('path');
require('dotenv').config();

// Route imports
const textUploadRouter = require('./routes/textUpload');
const recommendationsRouter = require('./routes/recommendations');
const uploadRouter = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5001;


// mongoose
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.warn('MONGO_URI not set. MongoDB connection will be attempted with default localhost URI.');
}
mongoose.connect(MONGO_URI || 'mongodb://127.0.0.1:27017/virtual_stylist')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('DB error:', err));


// set MONGO_URI in config or .env


// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies if needed

// Routes
app.use('/api/text-upload', textUploadRouter);
app.use('/api/recommendations', recommendationsRouter);
app.use('/api/upload', uploadRouter);

// Basic test route
app.get('/', (req, res) => {
  res.send('Virtual Stylist Backend is Running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
