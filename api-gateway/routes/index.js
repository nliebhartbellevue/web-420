/**
 * @title         routes/index.js
 * @author        Nathaniel Liebhart
 * @date          October 21, 2019
 * @description   This is the index file where all of the routes will be served to the application
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
