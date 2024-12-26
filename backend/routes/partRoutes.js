// backend/routes/partRoutes.js

const express = require('express');
const Part = require('../models/Part');
const router = express.Router();

// Get all available parts
router.get('/', async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

