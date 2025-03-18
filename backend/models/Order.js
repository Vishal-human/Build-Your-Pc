const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{ id: String, price: Number }],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled'],
        default: 'Pending'
    }, createdAt: { type: Date, default: Date.now },
    address: {
        fullName: String,
        email: String,
        phoneNumber: String,  // This is different from what you're sending
        streetAddress: String,
        city: String,
        state: String,
        zipCode: String
    },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Order", OrderSchema);





