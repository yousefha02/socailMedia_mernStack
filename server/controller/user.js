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
        const posts = await Post.find({creatorId:userId}).populate("ceatorId").sort({ createdAt: -1 })
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