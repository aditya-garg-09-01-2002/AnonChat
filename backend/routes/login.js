// routes/user.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Define user routes
router.post('/', loginController.validateLogin);

module.exports = router;
