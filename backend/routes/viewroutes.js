const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const Checkout = require('../models/checkout'); // Import the Checkout model
const { encryptPassword, comparePassword } = require('../middleware/passwordMiddleware'); // Import password middleware
const { isAuthenticated } = require('../middleware/sessionMiddleware');
const authController = require('../controllers/AuthController');
//modeles
const CPU = require('../models/cpu');
const Motherboard = require('../models/motherboard');
const RAM = require('../models/ram');
const Storage = require('../models/storage');
const GPU = require('../models/gpu');
const PSU = require('../models/PSU');
const Cabinet = require('../models/cabinet');
const CPUCooler = require('../models/CPUCooler');
const Order = require('../models/Order');
// Route: Home
router.get('/', (req, res) => {


  res.render('Home', { session: req.session });
});


router.get('/login', authController.getLoginPage);

router.post('/login', authController.login);

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

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).send("Could not log out");
    }
    res.redirect("/");
  });
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

// Toggle User Active/Inactive Status
router.put("/users/:id/toggle", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.isActive = !user.isActive; // Toggle the status
    await user.save();

    res.json({
      success: true,
      isActive: user.isActive,
      message: `User is now ${user.isActive ? 'Active' : 'Inactive'}`,
    });
  } catch (error) {
    console.error("Error toggling user status:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

router.get('/cpuselect', (req, res) => {
  res.render('CpuSelect', {
    title: 'Select Your CPU',
    selectedCpu: '',
  });
});

router.post('/componentselection', (req, res) => {
  // Process form data if needed
  const selectedCpu = req.body.cpuSelection; // Get selected CPU from form
  res.render('componentselection', { selectedCpu }); // Redirect to the GET route
});

router.get('/api/componentselection/json', async (req, res) => {
  try {
    const [cpuProducts, motherboardProducts, ramProducts, storageProducts, psuProducts, gpuProducts, cpuCoolerProducts, cabinetProducts] = await Promise.all([
      CPU.find(),
      Motherboard.find(),
      RAM.find(),
      Storage.find(),
      PSU.find(),
      GPU.find(),
      CPUCooler.find(),
      Cabinet.find()
    ]);

    res.json({
      cpuProducts,
      motherboardProducts,
      ramProducts,
      storageProducts,
      psuProducts,
      gpuProducts,
      cpuCoolerProducts,
      cabinetProducts,
      title: 'Select Your Components',
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
});

router.get('/componentselection', async (req, res) => {
  try {
    const [cpuProducts, motherboardProducts, ramProducts, storageProducts, psuProducts, gpuProducts, cpuCoolerProducts, cabinetProducts] = await Promise.all([
      CPU.find(),
      Motherboard.find(),
      RAM.find(),
      Storage.find(),
      PSU.find(),
      GPU.find(),
      CPUCooler.find(),
      Cabinet.find()
    ]);

    res.render('componentselection', {
      cpuProducts,
      motherboardProducts,
      ramProducts,
      storageProducts,
      psuProducts,
      gpuProducts,
      cpuCoolerProducts,
      cabinetProducts,
      title: 'Select Your Components',
      selectedCpu: req.query.selectedCpu,
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
});


router.post('/place-order', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    const userId = req.session.user.id; // Extract userId properly
    const { products, address, totalAmount } = req.body;

    const order = new Order({
      userId,  // Now userId is properly defined
      products,
      totalAmount,
      address,
      status: "Pending"
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });

  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

router.get('/api/orders', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Find orders related to the logged-in user
    const orders = await Order.find({ userId: req.session.user.id }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ error: 'User not logged in' });
    }

    // Find orders related to the logged-in user
    const orders = await Order.find({ userId: req.session.user.id }).sort({ createdAt: -1 });

    res.render('orders', { orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.get('/about', async (req, res) => {
  res.render('about')
})






//update status active true or false


module.exports = router;
