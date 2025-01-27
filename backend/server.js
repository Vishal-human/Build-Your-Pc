const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo'); // Use MongoDB session store
const cors = require('cors'); // Enable CORS it 

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Set up multiple view paths
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, '../frontend/views/customerview'),
  path.join(__dirname, '../frontend/views/adminview'),
]);

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || '1234',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/buildYourPC',
      ttl: 2 * 24 * 60 * 60, // Time-to-live: 2 days in seconds
    }),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
      secure: false, // Set to true if using HTTPS
    },
  })
);

// Enable CORS
app.use(cors());

// MongoDB connection //mongoose is used to connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buildYourPC', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// View Routes
const viewRoutes = require('./routes/viewroutes');
app.use('/', viewRoutes);

// Admin Routes
const adminRoutes = require('./routes/adminroutes');
app.use('/admin', adminRoutes);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).send('404: Page not found');
});

// Start the server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
