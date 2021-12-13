const mongoose = require('mongoose');

const StreamParamsSchema = new mongoose.Schema(
    {
        user_id:{type:String, required:true},
        callname:{type:String, required:true},
        calldesc:{type:String, required:true},
        callwhy:{type:String, required:true},
        totaltime:{type:String, required:true},
        coin:{type:Number, required:true},

    },
    {timestamps:true}
    );
module.exports = mongoose.model("StreamParams", StreamParamsSchema);