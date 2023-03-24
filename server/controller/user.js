const Photo = require('../model/Photo')
const User = require('../model/User')
const Post = require('../model/Post')

exports.sharePost = async(req,res,next)=>
{
    try{
        const user = await User.findById(req.userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404;
            throw error;
        }
        const {content} = req.body
        const post = await Post.create({ceatorId:req.userId,content})
        if(req.file)
        {
            post.image = req.file.filename
            await Photo.create({image:post.image,creatorId:req.userId})
        }
        await post.save()
        res.status(200).json({post})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUserPosts = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404
            throw error;
        }
        const posts = await Post.find({ceatorId:userId}).populate("ceatorId").sort({ createdAt: -1 })
        res.status(200).json({posts})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUserPhotos = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const photos = await Photo.find({creatorId:userId})
        res.status(200).json({photos})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUser = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({user})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.changeCoverImage = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        if(!req.file)
        {
            const error = new Error('image is not found')
            error.statusCode = 422
            throw error ;
        }
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404 ;
            throw error
        }
        user.coverImage = req.file.filename
        await user.save()
        res.status(201).json({user})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.changeProfileImage = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        if(!req.file)
        {
            const error = new Error('image is not found')
            error.statusCode = 422
            throw error ;
        }
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404 ;
            throw error
        }
        user.profileImage = req.file.filename
        await user.save()
        res.status(201).json({user})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.editProfile = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const {name,country} = req.body
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404 ;
            throw error
        }
        user.name = name
        user.country = country
        await user.save()
        res.status(201).json({user})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUsers = async(req,res,next)=>
{
    try{
        const users = await User.find()
        res.status(200).json({users})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.followAndUnFollowUser = async(req,res,next)=>
{
    try{
        const {userId,friendId} = req.params
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)
        if(!user||!friend)
        {
            const error = new Error('user is not found')
            error.statusCode = 404;
            throw error
        }
        if(user.following.findIndex(u=>u.userId.toString()===friendId.toString())===-1)
        {
            user.following.push({userId:friendId})
            friend.followers.push({userId:userId})
        }
        else{
            user.following = user.following.filter(u=>u.userId.toString()!==friendId.toString())
            friend.followers = user.followers.filter(u=>u.userId.toString()!==userId.toString())
        }
        await user.save()
        await friend.save()
        res.status(201).json({message:"success"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getTimelinePosts = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404;
            throw error;
        }
        const posts = await Post.find({ceatorId:userId}).populate("ceatorId")
        const friendsPosts = await Promise.all(user.following.map(friend=>
        {
            return Post.find({ceatorId:friend.userId}).populate("ceatorId")
        }))
        res.status(200).json(posts.concat(...friendsPosts))
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getFolllowings = async(req,res,next)=>
{
    try{
        const {userId} = req.params
        const user = await User.findById(userId).populate('following.userId')
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({following:user.following})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getFolllowers = async(req,res,next)=>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId).populate('followers.userId')
        if(!user)
        {
            const error = new Error('user is not found')
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({followers:user.followers})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.saveAndUnsavePost = async(req,res,next)=>
{
    try{
        const userId = req.userId
        const {postId} = req.params
        const post = await Post.findById(postId)
        const user = await User.findById(userId)
        if(!post)
        {
            const error = new Error('post not found')
            error.statusCode = 404
            throw error
        }
        if(user.savedPosts.findIndex(item=>item.postId.toString()===post._id.toString())==-1)
        {
            user.savedPosts.push({postId:postId})
            post.userSaved.push({userId:userId})
        }
        else{
            user.savedPosts = user.savedPosts.filter(item=>item.postId.toString()!==post._id.toString())
            post.userSaved =  post.userSaved.filter(item=>item.userId.toString()!==userId.toString())
        }
        await user.save()
        await post.save()
        res.status(201).json({message:"success"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUserSavedPosts = async(req,res,next)=>
{
    try{
        const userId = req.userId
        const user = await User.findById(userId).populate({path:'savedPosts.postId',populate:{path:"ceatorId"}})
        res.status(200).json({posts:user.savedPosts})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.likePost = async(req,res,next)=>
{
    try{
        const userId = req.userId
        const {postId} = req.params
        const post = await Post.findById(postId)
        const creator = await User.findById(post.ceatorId)
        const user = await User.findById(userId)
        if(!post)
        {
            const error = new Error('post not found')
            error.statusCode = 404
            throw error
        }
        if(post.usersLike.findIndex(item=>item.userId.toString()===userId.toString())==-1)
        {
            post.usersLike.push({userId:userId})
            creator.notifications.push({content:`${user.name} likes your post`})
        }
        else{
            post.usersLike =  post.usersLike.filter(item=>item.userId.toString()!==userId.toString())
        }
        await post.save()
        await creator.save()
        res.status(201).json({message:"success"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getUserNotifications = async(req,res,next)=>
{
    try{
        const userId = req.userId
        const user = await User.findById(userId)
        res.status(200).json({notifications:user.notifications})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.handleSeenNotifications = async(req,res,next)=>
{
    try{
        const userId = req.userId
        const user = await User.findById({_id:userId},{$set:{'notifications.$[].seen':true}})
        res.status(200).json({message:"success"})
    }
    catch(err)
    {
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    }
}