const Admin = require('../models/Admin');
const Payments = require('../models/Payments')
const Tournament = require('../models/Tournament')
const Game =require('../models/Game')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const jwtKey='r1senronik2003';


exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Contact number and OTP are required' });
  }

  try {
    const admin = await Admin.findOne({ username }).exec();
    if (!admin) {
      return res.status(401).json({ message: 'Admin not found, please try again.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials for password, please try again.' });
    }

    // Create a JWT token
    const token = jwt.sign({ username: admin.username, adminId: admin._id }, jwtKey, {
      expiresIn: '2h', // You can customize the expiration time
    });

    res.json({
      message: 'Login successful.',
      token: token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error occurred.', error: error.message });
  }
};


exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payments.find();
    res.json({ success: true, data: payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ success: false, message: 'Error fetching payments', error: error.message });
  }
};

exports.tournamentRegister = async (req, res) => {
  try {
    const { tournamentName, timeline, numberOfGames, costPerGame,gameType,playerType,date } = req.body;

    // Optional: Validate the data here
    // ...

    const newTournament = new Tournament({
      tournamentName,
      timeline,
      numberOfGames,
      costPerGame,
      gameType,
      playerType,
      date
    });

    await newTournament.save();

    res.status(201).json({
      message: 'Tournament registered successfully',
      tournament: newTournament
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering tournament', error: error.message });
  }
};


exports.tournamentDetail = async (req, res) => {
  try {
    const tournaments = await Tournament.find({});

    res.status(200).json({
      message: 'Tournaments fetched successfully',
      tournaments: tournaments
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments', error: error.message });
  }
};

exports.storeGamesForTournament = async (req, res) => {
  try {
    // Extract tournamentId and games array from the request body
    const { tournamentId, games } = req.body;

    // Check if the tournament with the given ID exists
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: 'Tournament not found' });
    }

    // Map game details and store them in the Game collection
    const gameDetails = games.map(game => ({
      tournamentId: tournament._id,
      gameId: game.gameId,
      gameName: game.gameName,
      winnerId: '', // Initial winnerId is empty
      winnerName: '' // Initial winnerName is empty
    }));

    const savedGames = await Game.insertMany(gameDetails);

    // Update the tournament document with the game IDs
    tournament.games = savedGames.map(savedGame => savedGame._id);
    await tournament.save();

    res.status(201).json({ message: 'Games stored successfully' });
  } catch (error) {
    console.error('Error storing games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.paymentResponse = async (req, res) => {
  try {
    const { transaction_id, status } = req.body;

    // Find payment by transactionId
    const payment = await Payments.findOne({ transaction_id: transaction_id });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found for the given transaction ID' });
    }

    // Update payment status based on the provided status parameter
    payment.status = status;

    // Save the updated payment to the database
    await payment.save();

    // Return a success response
    return res.json({ success: true, message: 'Payment status updated successfully' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    return res.status(500).json({ success: false, message: 'Error updating payment status' });
  }
};