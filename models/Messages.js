const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
    {
        recieverUser:{type:String, required:true},
        senderUser:{type:String, required:true},
        messageContent:{type:String, required:true},
        messageFilePath:{type:String, default:null},
        socketIdSender:{type:String, required:true},
        socketIdReciever:{type:String, required:true}
    },
    {timestamps:true}
    );

module.exports = mongoose.model("Messages", MessagesSchema);