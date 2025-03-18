const express = require('express');
const router = express.Router();
const { encryptPassword, comparePassword } = require('../middleware/passwordMiddleware'); // Import password middleware
const { isAuthenticated } = require('../middleware/sessionMiddleware');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); // Ensure correct path
const CPU = require('../models/cpu');
const Motherboard = require('../models/motherboard');
const RAM = require('../models/ram');
const Storage = require('../models/storage');
const GPU = require('../models/gpu');
const PSU = require('../models/PSU');
const Cabinet = require('../models/cabinet');
const CPUCooler = require('../models/CPUCooler');
const User = require('../models/User');
const Order = require('../models/Order');
//admin : /admin 

router.get('/', (req, res) => {
    res.render('adminlogin', {
        error: '',
    });
});

router.get('/login', (req, res) => {
    res.render('adminlogin', {
        error: ''
    });
});

router.post('/login', async (req, res) => {   //
    const { adminusername, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminusername });
        if (!admin) {
            return res.status(400).render('adminlogin', {
                error: 'Invalid admin',
            });
        }
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(400).render('adminlogin', {
                error: 'Invalid password',
            });
        }
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }
});




// router.get('/productmanagement', (req, res) => {
//     //middleware to check if the admin is authenticated if the admin is login than he can access the dashboard
//     res.render('Productmanagement');

// });




// Route to handle password update
router.post('/dashboard', async (req, res) => {
    const { adminusername, oldpassword, newpassword } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ adminusername });
        if (!admin) {
            return res.render('dashboard', { error: 'Admin not found', message: null });
        }

        // Ensure admin has a password before comparing
        if (!admin.password) {
            return res.render('dashboard', { error: 'Admin password is missing in the database', message: null });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldpassword, admin.password);
        if (!isMatch) {
            return res.render('dashboard', { error: 'Incorrect old password', message: null });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Update the password
        admin.password = hashedPassword;
        await admin.save();

        res.render('dashboard', { message: 'Password updated successfully!', error: null });

    } catch (err) {
        console.error(err);
        res.render('dashboard', { error: 'Error updating password', message: null });
    }
});

router.get('/Productmanagement', async (req, res) => {
    try {

        const ramProducts = await RAM.find();
        const psuProducts = await PSU.find();
        const cpuProducts = await CPU.find();
        const motherboardProducts = await Motherboard.find();
        const storageProducts = await Storage.find();
        const gpuProducts = await GPU.find();
        const cpuCoolerProducts = await CPUCooler.find();
        const cabinetProducts = await Cabinet.find();

        res.render('Productmanagement', { ramProducts, psuProducts, cpuProducts, motherboardProducts, storageProducts, gpuProducts, cpuCoolerProducts, cabinetProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
    }
});

router.get("/dashboard", async (req, res) => {
    try {
        const users = await User.find();
        const order = await Order.find();
        console.log("Fetched Users:", users); // Debugging: Print users in the console
        res.render('dashboard', { users, order });


    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
});




// router.get('/componentselection', async (req, res) => {
//     try {
//         const cpuProducts = await CPU.find();
//         const motherboardProducts = await Motherboard.find();
//         const ramProducts = await RAM.find();
//         const storageProducts = await Storage.find();
//         const psuProducts = await PSU.find();
//         const gpuProducts = await GPU.find();
//         const cpuCoolerProducts = await CPUCooler.find();
//         const cabinetProducts = await Cabinet.find();

//         res.render('componentselection', {
//             cpuProducts,
//             motherboardProducts,
//             ramProducts,
//             storageProducts,
//             psuProducts,
//             gpuProducts,
//             cpuCoolerProducts,
//             cabinetProducts,
//             title: 'Select Your Components',
//         });

//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
//     }
// });





module.exports = router;