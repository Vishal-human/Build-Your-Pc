// backend/models/Part.js

const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'CPU', 'GPU'
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model('Part', partSchema);

