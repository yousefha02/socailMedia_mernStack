const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    content:{type:String},
    photoId:{type:mongoose.Types.ObjectId,ref:"Photo"},
    ceatorId:{type:mongoose.Types.ObjectId,ref:"User"},
    usersLike:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
        }
    ],
    commnets:[
        {
            userId:{type:mongoose.Types.ObjectId,ref:"User",required:true},
            content:{type:String,required:true}
        }
    ],
},{timestamps:true})

module.exports = mongoose.model('Post',postSchema)