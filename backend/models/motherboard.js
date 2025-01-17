const mongoose = require('mongoose');

const motherboardSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true,
        enum: ['ASUS', 'MSI', 'Gigabyte', 'ASRock', 'EVGA', 'Other']
    },
    model: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true,
        enum: ['ATX', 'Micro-ATX', 'Mini-ITX', 'Extended-ATX', 'Other']
    },
    socket: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    memorySlots: {
        type: Number,
        required: true,
        min: 1
    },
    memoryType: {
        type: String,
        required: true,
        enum: ['DDR4', 'DDR5']
    },
    maxMemory: {
        type: Number,
        required: true,
        min: 1
    },
    pcieSlots: {
        x16: { type: Number, default: 0 },
        x8: { type: Number, default: 0 },
        x4: { type: Number, default: 0 },
        x1: { type: Number, default: 0 }
    },
    sataConnectors: {
        type: Number,
        default: 0
    },
    m2Slots: {
        type: Number,
        default: 0
    },
    usbPorts: {
        usb2: { type: Number, default: 0 },
        usb3: { type: Number, default: 0 },
        typeC: { type: Number, default: 0 }
    },
    networking: {
        ethernet: { type: Boolean, default: true },
        wifi: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false }
    },
    price: {
        type: Number,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },

    support_cpu: { //support cpu is the cpu that the motherboard supports 
        type: String,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Motherboard', motherboardSchema);
