var express = require('express');
var router = express.Router();
var User = require('../models/user');
const mongodb = require('mongodb')

router.use(function (req, res, next) {
    // Good place for authentication and logging
    console.log('hit Users Route');
    next(); // make sure we go to the next routes and don't stop here
})
router.get('/', function (req, res, next) {
  
  res.render('login-form',{
    logintitle: "NodeJS-Incremental User Creation and Login Route",
    layout: 'loginlayout',
  })
})
router.post('/signup', function (req, res, next) {
  console.log("attempting to add user");

})
router.post('/login', function (req, res, next) {
  console.log("attempting to login");

})


module.exports = router;