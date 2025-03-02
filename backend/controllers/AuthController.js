const User = require('../models/User');
const { comparePassword } = require('../middleware/passwordMiddleware');

// Common page data to avoid duplication
const getPageData = (email = '', error = '') => ({
    email,
    title: 'Login - Build Your PC',
    signupUrl: '/signup',
    loginAction: '/login',
    siteName: 'BuildYourPC',
    action: '/login',
    imageUrl: 'https://images.unsplash.com/photo-1628269989095-ef8569497706?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    error,

});

class AuthController {
    // Get login page
    getLoginPage(req, res) {
        res.render('login', getPageData());
    }

    // Handle login POST
    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find user by email
            const user = await User.findOne({ email });

            // Handle user not found
            if (!user) {
                return res.status(400).render('login',
                    getPageData(email, 'User not found.')
                );
            }

            // Check if the user is deactivated
            if (!user.isActive) {
                return res.status(403).render('login',
                    getPageData(email, 'Your account is deactivated. Please contact support.')
                );
            }

            // Check password
            const isMatch = await comparePassword(password, user.password);

            // Handle invalid password
            if (!isMatch) {
                return res.status(400).render('login',
                    getPageData(email, 'Invalid password')
                );
            }

            // If everything is ok, proceed with login
            // Add your session/token logic here
            res.redirect('/'); // or wherever you want to redirect after login

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).render('login',
                getPageData(email, 'An error occurred during login. Please try again.')
            );
        }
    }
}

module.exports = new AuthController();
