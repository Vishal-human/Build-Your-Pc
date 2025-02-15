const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // Import the User model
const { comparePassword } = require('../middleware/passwordMiddleware');
const { isAuthenticated } = require('../middleware/sessionMiddleware');

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


module.exports = router;