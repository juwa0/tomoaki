// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    // e.g. "1678463433-originalname.jpg"
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // In a real app, you might call an ML service to classify the image
  // or store the file path in a DB, etc.
  console.log('Uploaded file:', req.file);

  return res.json({
    message: 'File uploaded successfully',
    filePath: req.file.path,
  });
});

module.exports = router;
