const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const viewroutes = require('./routes/viewroutes')

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '../frontend/views'));


// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../frontend')));
// Set EJS as the view engine
app.set('view engine', 'ejs')


mongoose.connect('mongodb://localhost:27017/buildYourPC', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// View Routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
