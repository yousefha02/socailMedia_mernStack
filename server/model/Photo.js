const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    image:{type:String,required:true},
    creatorId:{type:mongoose.Types.ObjectId,required:true}
},{timestamps:true})

module.exports = mongoose.model('Photo',photoSchema)