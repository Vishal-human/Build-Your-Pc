const express = require('express');
const router = express.Router();
const { encryptPassword, comparePassword } = require('../middleware/passwordMiddleware'); // Import password middleware
const { isAuthenticated } = require('../middleware/sessionMiddleware');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin'); // Ensure correct path
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

router.get('/dashboard', (req, res) => { //middleware to check if the admin is authenticated if the admin is login than he can access the dashboard
    res.render('dashboard');

});



router.get('/productmanagement', (req, res) => {
    //middleware to check if the admin is authenticated if the admin is login than he can access the dashboard
    res.render('Productmanagement');

});


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

module.exports = router;