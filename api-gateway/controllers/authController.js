/**
 * @title           controllers/authController.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This file will handle all of the authentication logic
 */
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

// Register a new user on POST
exports.user_register = (req, res) => {
  // tell bcrypt to hash the password and set it equal to hashedPwd
  let hashedPwd = bcrypt.hashSync(req.body.password, 8);

  // declare a new user
  let newUser = new User({
    username: req.body.username,
    password: hashedPwd,
    email: req.body.email
  });

  // attempt to add new user - returns a error with 500 sc if err, and 200 sc if success
  User.add(newUser, (err, user) => {
    if (err)
      return res
        .status(500)
        .send(`There was an error trying to register ${newUser.username}!`);

    let token = jwt.sign({ id: user._id }, config.web.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
};

/**
 * attempts to verify the jwt,
 * if no token return sc of 401,
 * if err with token return sc of 500,
 * if err finding user return sc of 500,
 * if no user found return sc of 404,
 * on success return 200 & user
 */
exports.user_token = (req, res) => {
  let token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided!" });

  jwt.verify(token, config.web.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token!" });

    User.getById(decoded.id, (err, user) => {
      if (err)
        return res.status(500).send("There was a problem finding the User!");

      if (!user) return res.status(404).send("No User found!");

      res.status(200).send(user);
    });
  });
};

/**
 * user_login
 * @params: email, password
 * @returns: token
 */
exports.user_login = (req, res) => {
  User.getOne(req.body.email, (err, user) => {
    if (err) return res.status(500).send("Error on server!");

    if (!user) return res.status(404).send("No user found!");

    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    let token = jwt.sign({ id: user._id }, config.web.secret, {
      expiresIn: 86400 // Expires in 24 hours
    });

    res.status(200).send({ auth: true, token });
  });
};

// handles user log out request
exports.user_logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};
