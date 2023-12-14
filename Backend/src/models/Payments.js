const mongoose = require('mongoose');
 // Define a MongoDB schema for transactions
const paymentSchema = new mongoose.Schema({
  Username: {
    type: String,
    trim: true,
}
,Phonenumber: {
  type: String,
  required: [true, 'Phone number is required'],
  trim: true,
  unique: true, 
},
  transaction_id: {
    type: String,
    required: true,
    unique: true,
  } ,
  amount: {
    type:Number,
    ref: 'User',
    required: true,
  },
  status:{
    type:Boolean,
    default:false
  }
});

// Use discriminator to extend the 'Admin' model
const Payments = mongoose.model('Payment', paymentSchema);

module.exports = Payments;
