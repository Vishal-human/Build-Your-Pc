const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    adminusername: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;

