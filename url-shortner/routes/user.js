const express = require('express')
const {handleSignUpForm} = require('../controllers/user')
const {handleUserLogIn} = require('../controllers/user')
const router = express.Router();


router.post('/',handleSignUpForm)
router.post('/login',handleUserLogIn)

module.exports = router;