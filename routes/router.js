const express = require('express');
const router = express.Router();

const sillysecretsController  = require('../controllers/sillysecrets'); 
const usersController        = require('../controllers/users');


// "soon" we will include our authentication middleware here.

// Routes

// Sillysecrets routes

/* GET request for creating a sillysecrets. NOTE This must come before route that displays sillysecrets (uses id) */
router.get('/sillysecrets', sillysecretsController.getSecrets);

/* POST request for creating sillysecrets. */
router.post('/sillysecrets', sillysecretsController.createSecret);

/* Delete (using method overide middleware ) request to delete sillysecrets. */
router.delete('/sillysecrets/:id', sillysecretsController.deleteSecret);

// Users routes

/* Load our sign-in page */
router.get('/users', usersController.getLoginForm);

/* POST request for signup/creating users. */
router.post('/users/signup', usersController.signupUser);

/* POST request for signup/creating users. */
router.post('/users/login', usersController.loginUser);



module.exports = router