const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema(
    {
        title:{type: String, required: true},
        header: {type: String, required: true},
        headerimg: {type: String, required:true},
        content: {type: String, required: true},
        filepath: {type: String, required: true},
        forAdmin:{type:Boolean, required: true},
        forUser:{type:Boolean, required: true},
        forEditor:{type:Boolean, required: true},
        forSpecialUser:{type:String, required: true},
    },
    {timestamps:true},
);

module.exports = mongoose.model("Notification", NotificationSchema)