const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  streetAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  card: {
    type: Boolean,
  },
  upi: {
    type: Boolean,
  },
});

// Custom validation to ensure either card or upi is required
checkoutSchema.pre('validate', function(next) {
  if (!this.card && !this.upi) {
    this.invalidate('card', 'Either card or upi is required.');
    this.invalidate('upi', 'Either card or upi is required.');
  }
  next();
});

// Create the model from the schema
const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;