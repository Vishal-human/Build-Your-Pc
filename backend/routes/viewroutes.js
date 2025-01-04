const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const { encryptPassword, comparePassword } = require('../middleware/passwordMiddleware'); // Import the middleware



// Route: Home
router.get('/', (req, res) => {
  res.render('index', { title: 'Home - Build Your PC' });
});

// Route: Login Page

router.get('/login', (req, res) => {
  res.render('login', {
    email: '', // Pass a default or fetched value
    title: 'Login - Build Your PC',
    signupUrl: '/signup', // URL for the sign-up page
    loginAction: '/login', // Form action for the login
    siteName: 'BuildYourPC', // Name of the site
    action: '/login', // Form action for the login
    error: '',
    imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Image for the left section
  });
});

// Login Post
// 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', {
      email,
      title: 'Login - Build Your PC',
      signupUrl: '/signup',
      loginAction: '/login',
      siteName: 'BuildYourPC',
      action: '/login',
      imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      error: 'User not found.'
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', {
      email,
      title: 'Login - Build Your PC',
      signupUrl: '/signup',
      loginAction: '/login',
      siteName: 'BuildYourPC',
      action: '/login',
      imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      error: 'Invalid password.'
      });
    }

    res.render('assemble', { title: 'Assemble Your PC' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
});


router.get('/signup', (req, res) => {
  res.render('signup', {
    fullname: '', // Pass a default or fetched value
    email: '', // Pass a default or fetched value
    title: 'Sign Up - Build Your PC',
    loginUrl: '/login', // URL for the login page
    signupAction: '/signup', // Form action for the sign-up
    siteName: 'BuildYourPC', // Name of the site
    imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Image for the left section
    emailerror: '',
    error: '',
  });
});

router.post('/signup', encryptPassword, async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  // Validate passwords match
  if (!comparePassword(password, confirmPassword)) {
    return res.status(400).send('Passwords do not match.');
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(500).render('signup', {
        fullname,
        email,
        title: 'Sign Up - Build Your PC',
        loginUrl: '/login',
        signupAction: '/signup',
        siteName: 'BuildYourPC',
        imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        emailerror: 'Email already exist',
        error: ''
      });
      
    }

    // Save the user to the database
    const newUser = new User({ fullname, email, password });
    await newUser.save();
    res.render('index');
  } catch (err) {
    console.error(err);
    res.status(500).render('signup', {
      fullname,
      email,
      title: 'Sign Up - Build Your PC',
      loginUrl: '/login',
      signupAction: '/signup',
      siteName: 'BuildYourPC',
      imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      error: 'Error registering user.',
      emailerror: '',
    });
  }
});

// Route: Assemble Page
router.get('/assemble', (req, res) => {
  res.render('assemble', { title: 'Assemble Your PC' });
});

router.get('/checkout', (req, res) => {
  res.render('checkout', { 
    title: 'Checkout',
    siteName: 'BuildYourPC',
    imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    action: '/checkout',
   });
});

router.post('/checkout', (req, res) => {
  console.log('This is the data' , req.body);
  res.json(req.body);
});




module.exports = router;
