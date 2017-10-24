const express = require('express');
const router = express.Router();


// require our controllers ( which we create in this commit )
const sillysecretsController  = require('../controllers/sillysecrets'); 
const usersController        = require('../controllers/users');


// "soon" we will include our authentication middleware here.

// routes

// sillysecrets routes

/* GET request for creating a sillysecrets. NOTE This must come before route that displays sillysecrets (uses id) */
router.get('/sillysecrets', sillysecretsController.getSecrets);

/* POST request for creating sillysecrets. */
router.post('/sillysecrets', sillysecretsController.createSecret);

/* Delete (using method overide middleware ) request to delete sillysecrets. */
router.delete('/sillysecrets/:id', sillysecretsController.deleteSecret);

// users routes

/*  */
router.get('/users', usersController.getLoginForm);

/* POST request for signup/creating users. */
router.post('/users/signup', usersController.signupUser);

router.post('/users/login', usersController.loginUser);

module.exports = router