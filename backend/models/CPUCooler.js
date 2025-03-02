const mongoose = require('mongoose');

const cpuCoolerSchema = new mongoose.Schema({
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
    socket: {
        type: String,
        required: true
    },
    tdp: {
        type: Number,
        required: true
    },
    cpuType: {
        type: [String], // Array of strings
        required: true
    },
    coolingType: {
        type: String,
        required: true
    },
    rpm: {
        type: Number,
        required: true
    },
    liquid: {
        type: Boolean,
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

module.exports = mongoose.model('CPUCooler', cpuCoolerSchema);