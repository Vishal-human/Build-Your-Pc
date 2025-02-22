const mongoose = require('mongoose');

const storageSchema = new mongoose.Schema({
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
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    nvmeSupport: {
        type: Boolean,
        required: true
    },
    readSpeed: {
        type: Number,
        required: true
    },
    writeSpeed: {
        type: Number,
        required: true
    },
    voltage: {
        type: Number,
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
    productImage: {
        type: String,
        required: true
    },

});


const storage = mongoose.model('storage', storageSchema);

module.exports = storage;
