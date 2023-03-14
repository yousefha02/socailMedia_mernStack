const express = require('express')
const router = express.Router()
const userCont = require('../controller/user')
const authUser = require('../middleware/userAuth')

router.post('/create_post',authUser.userAuth,userCont.sharePost)
router.get('/user/:userId/posts',authUser.userAuth,userCont.getUserPosts)

module.exports = router ; 