const express = require('express');

const { loginUser, signupUser, addToCart } = require('../controllers/userController');

const router = express.Router();

//route for login
router.post('/login', loginUser)

//route for signup
router.post('/signup', signupUser)

//route to addItemtoCart
router.put('/addtocart', addToCart)

module.exports = router;