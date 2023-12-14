const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
    gameId: { type: String, required: true },
    gameName: { type: String, required: true },
    winnerId: { type: String },
    winnerName: { type: String }
  });
  
  // Create the Game model
  const Game = mongoose.model('Game', gameSchema);
  
  module.exports =Game;
