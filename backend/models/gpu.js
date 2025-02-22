const mongoose = require('mongoose');

const gpuSchema = new mongoose.Schema({
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
    chipset: {
        type: String,
        required: true
    },
    memory: {
        type: Number,
        required: true
    },
    memoryType: {
        type: String,
        required: true
    },
    pcieVersion: {
        type: String,
        required: true
    },
    tdp: {
        type: Number,
        required: true
    },
    length: {
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
module.exports = mongoose.model('GPU', gpuSchema);