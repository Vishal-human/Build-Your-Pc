const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // Import the User model
const { comparePassword } = require('../middleware/passwordMiddleware');


//admin : /admin 

router.get('/', (req, res) => {
    res.render('adminview/adminlogin');
});

router.get('/login', (req, res) => {
    res.render('adminview/adminlogin');
});

router.post('/login', async (req, res) => {
    const { adminusername, password } = req.body;

    try {
        const admin = await Admin.findOne({ adminusername });
        if (!admin) {
            return res.status(400).render('adminview/adminlogin', {
                error: 'Invalid admin',
            });
        }
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(400).render('adminview/adminlogin', {
                error: 'Invalid password',
            });
        }
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }





});

router.get('/dashboard', (req, res) => {
    res.render('adminview/dashboard');
});

module.exports = router;