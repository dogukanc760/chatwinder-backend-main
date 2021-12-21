const mongoose = require('mongoose');

const LivedUserSchema = new mongoose.Schema(
    {
        user_id:{type:String, required:true},
        stream_url:{type:String, required:true},
        connection_code:{type:String, default:false},
        status:{type:Boolean, default:true},
        primary_server:{type:String, default:null},
        host_port:{type:String, default:null},
        stream_name:{type:String, default:null},
        stream_id:{type:String, default:null},
        username:{type:String, default:null},
        password:{type:String, default:null}
    },{timestamps:true}
    );
module.exports = mongoose.model("LivedUser", LivedUserSchema);