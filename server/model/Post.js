const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content:{type:String},
    image:{type:String,default:""},
    ceatorId:{type:mongoose.Types.ObjectId,ref:"User"},
    usersLike:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
        }
    ],
    userSaved:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)