const express = require('express')
const router = express.Router()
const userCont = require('../controller/user')
const authUser = require('../middleware/userAuth')

router.post('/create_post',authUser.userAuth,userCont.sharePost)
router.get('/user/:userId/posts',authUser.userAuth,userCont.getUserPosts)
router.get('/user/:userId/photos',authUser.userAuth,userCont.getUserPhotos)
router.get('/user/:userId',userCont.getUser)
router.post('/user/change-cover/:userId',authUser.userAuth,userCont.changeCoverImage)
router.post('/user/change-profile-image/:userId',authUser.userAuth,userCont.changeProfileImage)
router.post('/user/edit-profile/:userId',authUser.userAuth,userCont.editProfile)
router.get('/users',userCont.getUsers)
router.post('/follow/:userId/:friendId',authUser.userAuth,userCont.followAndUnFollowUser)
router.get('/timelines/:userId',authUser.userAuth,userCont.getTimelinePosts)
router.get('/followings/:userId',userCont.getFolllowings)
router.get('/followers/:userId',userCont.getFolllowers)

module.exports = router ; 