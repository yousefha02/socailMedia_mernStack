const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String,required:true},
    country:{type:String,required:true},
    profileImage:{type:String},
    coverImage:{type:String},
    about:{type:String},
    following:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User"}
        }
    ],
    followers:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User"}
        }
    ],
    savedPosts:[
        {
            postId:{type:mongoose.Types.ObjectId,required:true,ref:"Post"}
        }
    ],
    notifications:[
        {
            content:{type:String,requried:true},
            seen:{type:Boolean,default:false}
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)