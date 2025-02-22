const mongoose = require('mongoose');

const cpuSchema = new mongoose.Schema({
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
        required: true,
        enum: ['Intel', 'AMD']
    },
    cores: {
        type: Number,
        required: true
    },
    generation: {
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
    basespeed: {
        type: Number,
        required: true
    },
    boostspeed: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    tdp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CPU', cpuSchema);