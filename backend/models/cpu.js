const mongoose = require('mongoose');

const cpuSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true,
        enum: ['Intel', 'AMD']
    },
    // series: {
    //     type: String, //example: Core i3 or Core i5 or Core i7 or Core i9 or Core i10 or Core i11 or Core i12 or Core i13
    //     required: true //amd example: Ryzen 3 or Ryzen 5 or Ryzen 7 or Ryzen 9 or Ryzen 10 or Ryzen 11 or Ryzen 12 or Ryzen 13
    // },
    model: {
        type: String,
        required: true
    },

    generation: {
        type: String, //example: 13th Gen or 12th Gen or 11th Gen or 10th Gen or 9th Gen or 8th Gen or 7th Gen or 6th Gen or 5th Gen or 4th Gen or 3rd Gen or 2nd Gen or 1st Gen
        required: true
    },

    cores: {
        required: true,
        min: 1
    },

    threads: {
        type: Number,
        required: true,
        min: 1
    },

    frequency: {
        type: Number,
        required: true,
        min: 0
    },
    socket: {
        type: String,  //example: LGA 1700 or AM4 or AM5 or AM6 or AM7
        required: true
    },

    productImage: {
        type: String,
        required: true
    },


    price: {
        type: Number,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    }
});
module.exports = mongoose.model('CPU', cpuSchema);
