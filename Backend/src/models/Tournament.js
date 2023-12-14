const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  tournamentName: {
    type: String,
    required: true,
    trim: true
  },
  timeline: {
    type: String,
    required: true,
    trim: true
  },
  numberOfGames: {
    type: Number,
    required: true,
    min: [0, 'Number of games cannot be negative']
  },
  costPerGame: {
    type: Number,
    required: true,
    min: [0, 'Cost per game cannot be negative']
  },
  gameType:{
    type:String,
    required: true,
  },
  playerType:{
    type:String,
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
}, {
  timestamps: true // Optional: adds createdAt and updatedAt timestamps
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
