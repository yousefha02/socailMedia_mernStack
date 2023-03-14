const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req,res,next)=>
{
    try{
        const {email,name,password,country} = req.body
        const existUser = await User.findOne({email:email})
        if(existUser)
        {
            const error = new Error('Email is already exist')
            error.statusCode = 422
            throw error
        }
        const hashPass = await bcrypt.hash(password,12)
        await User.create({email,name,password:hashPass,country})
        res.status(201).json({message:"account has been created"})
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

exports.login = async(req,res,next)=>
{
    try{
        const {email,password} = req.body
        const user = await User.findOne({where:{email:email}})
        if(!user)
        {
            const error = new Error('Email is not found')
            error.statusCode = 403
            throw error
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            const error = new Error('password is wrong')
            error.statusCode = 403
            throw error
        }
        const token = jwt.sign({userId:user.id},"secret")
        res.status(200).json({token,user})
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