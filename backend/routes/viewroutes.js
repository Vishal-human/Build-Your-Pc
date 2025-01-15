const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const Checkout = require('../models/checkout'); // Import the Checkout model
const { encryptPassword, comparePassword } = require('../middleware/passwordMiddleware'); // Import password middleware
const { isAuthenticated } = require('../middleware/sessionMiddleware');
// Route: Home
router.get('/', (_, res) => {
  res.render('index', { title: 'Home - Build Your PC' });

});

// Route: Login Page
router.get('/login', (_, res) => {
  res.render('login', {
    email: '',
    title: 'Login - Build Your PC',
    signupUrl: '/signup',
    loginAction: '/login',
    siteName: 'BuildYourPC',
    action: '/login',
    error: '',
    imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  });
});

// Route: Login (POST)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
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
        error: 'User not found.',
      });

    }

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
        error: 'Invalid password',
      });
    }

    // Store user information in session
    req.session.user = { id: user._id, email: user.email };
    console.log(req.session.user.id);
    res.redirect('/assemble');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in.');
  }
});

// Route: Sign Up Page
router.get('/signup', (_, res) => {
  res.render('signup', {
    fullname: '',
    email: '',
    title: 'Sign Up - Build Your PC',
    loginUrl: '/login',
    signupAction: '/signup',
    siteName: 'BuildYourPC',
    imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    emailerror: '',
    passworderror: '',
  });
});

// Route: Sign Up (POST)
router.post('/signup', async (req, res, next) => {
  const { fullname, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('signup', {
      fullname,
      email,
      title: 'Sign Up - Build Your PC',
      loginUrl: '/login',
      signupAction: '/signup',
      siteName: 'BuildYourPC',
      imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      emailerror: ' ',
      passworderror: 'Passwords do not match.',
    });
  }

  next();
}, encryptPassword, async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('signup', {
        fullname,
        email,
        title: 'Sign Up - Build Your PC',
        loginUrl: '/login',
        signupAction: '/signup',
        siteName: 'BuildYourPC',
        imageUrl: 'https://images.unsplash.com/photo-1733042601024-b32fef0e743f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        emailerror: 'Email already exists.',
        passworderror: ' ',
      });
    }

    const newUser = new User({ fullname, email, password });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signing up.');
  }
});


router.get('/checkout', (req, res) => {
  // Print the user ID
  res.render('checkout', { title: 'Checkout - Build Your PC' });
});

router.post('/checkout', isAuthenticated, (req, res) => {
  // Print the user ID
  console.log(req.session.user.id); // Print the user ID
  const { fullName, email, streetAddress, city, state, zipCode, phone, paymentMethod, cardNumber, expiry, cvv, upiId, shipmentCharge, subtotal, total } = req.body;

  if (!paymentMethod) {
    return res.status(400).send('Payment method is required.');
  }

  const card = paymentMethod === 'card';
  const upi = paymentMethod === 'upi';

  const checkoutDetails = {
    userId: req.session.user.id,
    fullName,
    email,
    streetAddress,
    city,
    state,
    zipCode,
    phone,
    card,
    upi,
  };
  // Store the data in the database
  const checkout = new Checkout(checkoutDetails);
  checkout.save()
    .then(() => {
      res.redirect('/assemble');
    })
    .catch((err) => {
      console.error(err);
      if (err.errors && (err.errors.card || err.errors.upi)) {
        return res.status(400).send(err.message); // Send custom validation error message
      }
      res.status(500).send('Error submitting the form.');
    });
});
// Route: Protected "Assemble" Page
router.get('/assemble', isAuthenticated, (_, res) => {
  res.render('assemble', { title: 'Assemble Your PC' });
});


module.exports = router;
