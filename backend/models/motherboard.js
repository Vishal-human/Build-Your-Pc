const mongoose = require('mongoose');

const motherboardSchema = new mongoose.Schema({
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
    chipset: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },

    maxMemory: {
        type: Number,
        required: true
    },
    tdp: {
        type: Number,
        required: true
    },
    supportedProcessor: {
        type: [String],
        required: true
    },
    ramSlots: {
        type: Number,
        required: true
    },
    ramType: {
        type: String,
        required: true
    },
    nvmeSupport: {
        type: Boolean,
        required: true
    },
    pcieVersion: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Motherboard', motherboardSchema);


