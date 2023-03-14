const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversaitionSchema = new Schema({
    members:[
        {
            userId:{type:mongoose.Types.ObjectId,required:true,ref:"User"}
        }
    ]
},{timestamps:true})

module.exports = mongoose.model('Conversaition',conversaitionSchema)