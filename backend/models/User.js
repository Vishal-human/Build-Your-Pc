// models/User.js
const mongoose = require('mongoose');



// Define the schema for the user
const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});



// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other parts of the app
module.exports = User;
