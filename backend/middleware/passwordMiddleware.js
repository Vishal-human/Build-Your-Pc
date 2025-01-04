const bcrypt = require('bcryptjs');

// Middleware to encrypt the password before saving //for signup
const encryptPassword = async (req, res, next) => {
  if (!req.body.password) return next(); // If password is not present, skip

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    req.body.password = await bcrypt.hash(req.body.password, salt); // Hash the password
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).send('Error encrypting password');
  }
};

// Middleware to compare passwords (for login authentication)
const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

module.exports = { encryptPassword, comparePassword };
