const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '../frontend/views'));


// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../frontend')));

// Set EJS as the view engine
app.set('view engine', 'ejs')




// View Routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
