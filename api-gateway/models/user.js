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

// .add is used to add a new user to the database
module.exports.add = (user, cb) => {
  user.save(cb);
};

// .getById is used to find a user by ID
module.exports.getById = (id, cb) => {
  let query = { _id: id };
  User.findById(query, cb);
};

// Export user schema to the rest of the application
const User = (module.exports = mongoose.model('User', UserSchema));
