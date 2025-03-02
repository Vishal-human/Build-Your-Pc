const mongoose = require('mongoose');

const ramSchema = new mongoose.Schema({
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
    ramType: {
        type: String,
        required: true,
        enum: ['ddr', 'ddr2', 'ddr3', 'ddr4', 'ddr5']

    },
    ramCapacity: {
        type: Number,
        required: true
    },
    ramSpeed: {
        type: Number,
        required: true
    },
    voltage: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Ram', ramSchema);