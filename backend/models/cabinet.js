const mongoose = require('mongoose');

const cabinetSchema = new mongoose.Schema({
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
    size: {
        type: String,
        required: true
    },
    color: {
        type: [String], // Array of color options
        required: true
    },
    sidePanel: {
        type: String,
        required: true
    },
    motherboardFormFactor: {
        type: [String], // Array of supported motherboard form factors
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    usbSlots: {
        type: Number,
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cabinet', cabinetSchema);