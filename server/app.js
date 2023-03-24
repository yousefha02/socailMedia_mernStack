const express = require('express')
const app = express()
const parser = require('body-parser')
const multer = require('multer')
const path = require('path')

app.use(parser.json())
const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images');
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now()+"-" + file.originalname)
    }
})

app.use(multer({storage:fileStorage}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization')
    if(req.method==="OPTIONS")
    {
        return res.sendStatus(200)
    }
    next();
})

const Conversaition = require('./model/Conversaition')
const Message = require('./model/Message')
const Photo = require('./model/Photo')
const User = require('./model/User')
const Post = require('./model/Post')

const authRoute = require('./routes/auth')
app.use(authRoute)

const userRoute = require('./routes/user')
app.use(userRoute)

app.use((error,req,res,next)=>
{
    console.log(error);
    const status = error.statusCode
    const message = error.message
    res.status(status).json({message:message})
})

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yousefha02:2838293yo@cluster0.t5dqa.mongodb.net/socialMedia?retryWrites=true&w=majority')
.then(result=>
    {
        app.listen(process.env.PORT || 9000)
        console.log('conntect')
    })
.catch(err=>
    {
        console.log(err)
    })