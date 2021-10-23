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

userSchema.pre('save', async function(next) {
    console.log("hi from inside")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
    console.log(this.password)
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
