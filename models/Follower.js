const mongoose = require('mongoose');

const FollowerSchema = new mongoose.Schema(
    {
        followerId:{type:String, required:true},
        followingId:{type:String, required:true},
        status:{type:Boolean, default:true},
    },
    {timestamps:true}
    );

module.exports = mongoose.model("Follower", FollowerSchema);