const express = require('express');
  const router = express.Router();
  const apiController = require('../controllers/apiController');

  // Register a new user
  router.post('/register', apiController.register);

  // Create a reservation
  router.post('/reserve', apiController.reserve);

  // Get availability for a field
  router.get('/availability', apiController.getAvailability);

  module.exports = router;