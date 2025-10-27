// server/models/ClothingItem.js
const mongoose = require('mongoose');

const ClothingItemSchema = new mongoose.Schema({
  name: String,
  color: String,
  category: String,
  style: String,
  // ... add fields as needed
});

module.exports = mongoose.model('ClothingItem', ClothingItemSchema);
