const User = require('../models/user');

exports.getLoginForm = function (req, res, next) { 
  console.log("retrieving login form")
  res.render('login-form',{
    logintitle: "NodeJS-Incremental User Creation and Login Route",
    layout: 'loginlayout',
  })
}

exports.signupUser = function (req, res, next) {
  console.log("attempting to add user");

}

exports.loginUser = function (req, res, next) {
  console.log("attempting to login");

}