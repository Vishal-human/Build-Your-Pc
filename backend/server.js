const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const cors = require('cors');


dotenv.config();
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../frontend/views/customerview'),
  path.join(__dirname, '../frontend/views/adminview'),
]);

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || '1234',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/buildYourPC',
      ttl: 2 * 24 * 60 * 60,
    }),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// Middleware to Pass Session to Views
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Enable CORS
app.use(cors());

// MongoDB connection //without new parse 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buildYourPC',
  {

  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Routes
const viewRoutes = require('./routes/viewroutes');
const adminRoutes = require('./routes/adminroutes');
const productRoutes = require('./routes/products');

app.use('/', viewRoutes);
app.use('/admin', adminRoutes);
app.use('/api', productRoutes);
app.use('/uploads', express.static('uploads'));
const fs = require('fs');

app.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {

    res.status(404).json({ error: 'File not found' });
  }
});


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something broke!',
    error: err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});