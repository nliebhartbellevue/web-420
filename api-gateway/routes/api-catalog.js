/**
 * @title           routes/api-catalog.js
 * @author          Nathaniel Liebhart
 * @date            October 28, 2019
 * @description     This is the file that will server api related routes
 */
const express = require("express");
const router = express.Router();
const auth_controller = require("../controllers/authController");
const checkToken = require("../check-token");

// POST request for registering a user
router.post("/auth/register", auth_controller.user_register);
// POST request for logging a user in
router.post("/auth/login", auth_controller.user_login);

// GET request for verifying user token
router.get("/auth/token", checkToken, auth_controller.user_token);
// GET request to allow users to logout and set their token to null and auth to false
router.get("/auth/logout", auth_controller.user_logout);

// export router
module.exports = router;
