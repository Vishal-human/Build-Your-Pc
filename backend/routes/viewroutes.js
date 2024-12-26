const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the homepage (index.html)
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views', 'index.html'));
});

// Route to serve the PC assembly page (assemble.html)
router.get('/assemble', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views', 'assemble.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/views', 'login.html'));
});

module.exports = router;
 