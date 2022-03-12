const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    seoKey:{type:Array},
    color1:{type:String, default:''},
    color2:{type:String, default:''},
    color3:{type:String, default:''},
    color4:{type:String, default:''},
    color5:{type:String, default:''},
    color6:{type:String, default:''},
},{timestamps:true});


module.exports = mongoose.model("Setting", SettingSchema);