/**
 * Title: config.js
 * Author: Nathaniel Liebhart
 * Date: October 21, 2019
 * Description: This file will serve as a global hub for application level configurations
 */
var config = {};
config.web = {};
config.web.port = process.env.PORT || '3000';
config.web.secret = 'topsecret';
module.exports = config;
