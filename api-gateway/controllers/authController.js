/**
 * @title           controllers/authController.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This file will handle all of the authentication logic
 */
const User = require('../models/user');

// Register a new user on POST
exports.user_register = (req, res) => {
  res.send('NOT IMPLEMENTED: User registration POST');
};

// Verify token on GET
exports.user_token = (req, res) => {
  res.send('NOT IMPLEMENTED: User token lookup GET');
};
