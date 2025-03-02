const mongoose = require('mongoose');

const psuSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    wattage: {
        type: Number,
        required: true
    },
    efficiency: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PSU', psuSchema);