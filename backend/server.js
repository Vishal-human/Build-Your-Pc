const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, '../frontend')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// API Routes
const partRoutes = require('./routes/partRoutes');
app.use('/api/parts', partRoutes);

// View Routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);



app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
