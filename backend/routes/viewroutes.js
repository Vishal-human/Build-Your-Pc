const express = require('express');
const router = express.Router();

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
    
    imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Image for the left section
  });
});

router.get('/signup', (req, res) => {
  res.render('signup', {
    fullname: '', // Pass a default or fetched value
    email: '', // Pass a default or fetched value
    title: 'Sign Up - Build Your PC',
    loginUrl: '/login', // URL for the login page
    signupAction: '/signup', // Form action for the sign-up
    siteName: 'BuildYourPC', // Name of the site
    imageUrl: 'https://images.unsplash.com/photo-1661347334036-d484f970b1a1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Image for the left section
  });
});


// Route: Assemble Page
router.get('/assemble', (req, res) => {
  res.render('assemble', { title: 'Assemble Your PC' });
});

module.exports = router;
