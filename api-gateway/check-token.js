/**
 * Title: check-token.js
 * Author: Nathaniel Liebhart
 * Date: December 9, 2019
 * Description: Check token
 */
const jwt = require("jsonwebtoken");
const config = require("./config");

/**
 * Check the HTTP header for a valid JSON web token
 * @param req
 * @param res
 * @param next
 */
const checkToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided!" });

  jwt.verify(token, config.web.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token!" });

    req.userId = decoded.id;
    next();
  });
};

module.exports = checkToken;
