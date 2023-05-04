const express = require('express');

const { loginUser, signupUser } = require('../controllers/userController');

const router = express.Router();

//route for login
router.post('/login', loginUser)

//route for signup
router.post('/signup', signupUser)

module.exports = router;