// routes/user.js
const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

// Define user routes
router.post('/', registerController.addUser);

module.exports = router;
