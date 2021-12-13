const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema(
    {
        user_id:{type:String, required:true},
        name:{type:String, required:true},
        title:{type:String, required:true},
        description:{type:String, required:true},
        topic:{type:String, required:true},
        price:{type:Number, required:true},
        filepath:{type:String, required:true},
    },
    {timestamps:true}
    );

    module.exports = mongoose.model('Advert', AdvertSchema);