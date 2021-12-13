const mongoose = require('mongoose');

const UserImageSchema = new mongoose.Schema(
    {
        user_id:{type:String, required:true},
        desc:{type:String},
        imagepath:{type:String, required:true},
        isProfile:{type:Boolean, required:true}
    },
    {timestamps:true}
    );

module.exports=mongoose.model("Images", UserImageSchema);