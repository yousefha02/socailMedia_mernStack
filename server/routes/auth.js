const express = require('express')
const router = express.Router()
const authCont = require('../controller/auth')

router.post('/register',authCont.register);
router.post('/login',authCont.login)

module.exports = router ; 