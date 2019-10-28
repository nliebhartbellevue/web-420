/**
 * @title           routes/api-catalog.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This is the file that will server api related routes
 */
const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/authController');

// POST request for registering a user
router.post('/auth/register', auth_controller.user_register);

// GET request for verifying user token
router.get('/auth/token', auth_controller.user_token);

// export router
module.exports = router;
