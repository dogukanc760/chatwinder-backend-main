const mongoose = require('mongoose');

const LoggerSchema = new mongoose.Schema(
    { 
        logTitle:{type:String, required:true},
        logHeader:{type:String, required:true},
        logDesc:{type:String, required:true},
        logContent:{type:String, required:true},
        logDeepContent:{type:String, required:true},
        logLevel:{type:String, required:true},
        logFrom:{type:String, required:true},
        logTo:{type:String, required:true},
        logUser:{type:String, required:true},
    },
    {timestamps : true}
);

module.exports = mongoose.model("Logger", LoggerSchema);
