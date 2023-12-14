const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, 'username is required'],
        trim: true
    },
    Phonenumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        unique: true, // Make the phone number field unique
    },
    Password:{
        type:String,
        required:[true,'Password is required'],
        trim:true
    },
    amount:{
        type: Number,
        default:0
    },
    
    status:{
        type: String,
        default:"reject"
    },
    // otp: {
    //     type: String, // Add an OTP field to store the generated OTP
    // }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
