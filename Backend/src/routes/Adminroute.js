// driverRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controller/Admincontroller');

// Assuming driverController has a function named 'registerDriver'

router.post('/login', adminController.adminLogin);
router.get('/payments', adminController.getAllPayments);
router.put('/paymentResponse', adminController.paymentResponse);
router.post('/games', adminController.storeGamesForTournament);
router.post('/tournament', adminController.tournamentRegister);
router.get('/tournamentdetail', adminController.tournamentDetail);

module.exports = router;