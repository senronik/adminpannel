const User = require('../models/User');
const Payments = require('../models/Payments');
const Transaction = require('../models/Transaction');
const otpStorage = {}; 
const bcrypt = require('bcrypt');

const otpGenerator = require('otp-generator');
const twilio = require('twilio');

const accountSid = 'AC1ddef5ef335af5034c0fba9830bdea4b';
const authToken = 'c4eb9efcec3516d5731a4e8215f6d93a';

const client = new twilio(accountSid, authToken);



exports.registerUser = async (req, res) => {
    const {Username, Phonenumber,Password } = req.body;

    if (!Phonenumber || !Password || !Username) {
        return res.status(400).json({ message: 'All fields are required',success:false });
    }
    
    try {
        const newUser = new User({
            Phonenumber,
            Password,
            Username
        });

        await newUser.save();
        res.status(200).json({ success: true });
        
    } catch (error) {
        console.error('Error saving user to the database:', error);
        return res.status(500).json({ message: 'Error saving user to the database', error: error.message });
    }
};

exports.userLogin = async (req, res) => {
    const { Phonenumber ,Password } = req.body;
    if (!Phonenumber || !Password) {
        return res.status(400).json({ message: 'Contact number and OTP are required' });
    }

    try {
        const user = await User.findOne({ Password }).exec();
        // const user = await User.findOne({ Phonenumber }).exec();

        if (!user) {
            return res.status(401).json({ message: 'Password is not correct, please try again or register.',success:false });
        }
        
        res.json({
            message: 'Profile fetched successfully.',
            // userId: user._id,
            Phonenumber:user.Phonenumber,
            success:true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};


exports.getUserProfile = async (req, res) => {
    const { Phonenumber }  = req.params; // Assuming you're using Phonenumber as the identifier
    try {
        const driver = await User.findOne({ Phonenumber }).exec();
        console.log(driver)
        if (!driver) {
            return res.status(404).json({ message: 'User not found.' ,success:false});
        }

        const profileData = {
            fullName: driver.Phonenumber,
            amount: driver.amount,
            success:true
        };
        res.json({
            message: 'Profile fetched successfully.',
            profile: profileData,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred.', error: error.message });
    }
};

exports.Transactionupdate = async (req, res) => {
    const {Phonenumber,TransactionId,amount } = req.body;

    try {
        // Find the user by phone number
        const user = await User.findOne({ Phonenumber }).exec();

        // Check if user was found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const numericAmount = parseFloat(amount);  // or parseInt(amount) for integers

        user.amount += numericAmount;
        await user.save();

        // Record the transaction
        const transaction = new Payments({
            Username:user.Username,
            Phonenumber: user.Phonenumber,
            transaction_id: TransactionId, 
            amount: numericAmount, // Use the numeric value of amount
        });


        await transaction.save();

        res.json({ message: 'Money added successfully', newBalance: user.amount });
    } catch (error) {
        console.error('Error adding money:', error);
        res.status(500).json({ message: 'Error adding money', error: error.message });
    }
};


exports.updateMoney = async (req, res) => {
    const { userId, amount, transactionType } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's balance based on the transaction type
        if (transactionType === 'add') {
            user.amount += amount;
        } else if (transactionType === 'withdraw') {
            user.amount -= amount;
        } else {
            return res.status(400).json({ message: 'Invalid transaction type' });
        }

        await user.save();

        // Update the latest transaction for the user
        const latestTransaction = await Transaction.findOneAndUpdate(
            { userId, transactionType },
            { $inc: { amount } },
            { new: true }
        );

        if (!latestTransaction) {
            // If no previous transaction of the same type exists, create a new one
            const newTransaction = new Transaction({
                userId: userId,
                amount: amount,
                transactionType: transactionType,
            });

            await newTransaction.save();
        }

        res.json({ message: 'Money updated successfully', newBalance: user.balance });
    } catch (error) {
        console.error('Error updating money:', error);
        res.status(500).json({ message: 'Error updating money', error: error.message });
    }
};


exports.userDetails = async (req, res) => {
    try {
        const user = await User.find({}).exec(); // Fetch all User
        if (!user || user.length === 0) {
            return res.status(404).json({ success: false, message: 'No User found.'});
        }

        res.json({
            success: true,
            message: 'Users fetched successfully.',
            data: user
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error occurred.', error: error.message });
    }
};
// Assuming you have already required necessary modules and set up your Payment model

exports.savePayment = async (req, res) => {
    const { transaction_id,userId,amount } = req.body;

    try {
        // Assuming you have a 'User' model
        const userExists = await Payments.exists({ _id: userId });

        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Save payment details in the database
        const payment = new Payments({
            transaction_id: transaction_id,
            userId: userId,
            // Add other payment details if needed
        });

        await payment.save();

        res.json({ message: 'Payment details saved successfully', payment: payment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Error saving payment details', error: error.message });
    }
};


