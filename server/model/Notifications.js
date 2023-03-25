const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
    content:{type:String,required:true},
    seen:{type:Boolean,default:false},
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
},{timestamps:true})

module.exports = mongoose.model('Notifications',NotificationsSchema)