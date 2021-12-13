const mongoose = require("mongoose");

const SalesmentSchema = new mongoose.Schema(
    {
        buyUser:{type:String, required:true},
        giftUser:{type:String, required:true},
        product_id:{type:String, required:true},
        product_name:{type:String, required:true},
        price:{type:Number, required:true},
    },
    {timestamps:true}
    );

module.exports = mongoose.model("Salesment", SalesmentSchema);