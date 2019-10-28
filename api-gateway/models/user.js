/**
 * @title           models/user.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This file is used to create the user model and schema
 */
const mongoose = require('mongoose'),
  // User Schema
  UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
  });

// Export user schema to the rest of the application
const User = (module.exports = mongoose.model('User', UserSchema));
