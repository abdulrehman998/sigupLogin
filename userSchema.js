const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, 
    password:  {
        type: String,
        required: true
    },
    address:  {
        type: String,
        required: true
    },
    phoneNumber:  {
        type: Number,
        required: true
    },
    gender:  {
        type: String,
        required: true
    },
    created: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
