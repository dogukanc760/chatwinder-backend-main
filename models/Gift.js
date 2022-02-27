const mongoose = require('mongoose');

const GiftSchema = new mongoose.Schema({
    giftName:{type: String, required: true},
    giftImg:{type: String, required: true},
    giftDescription:{type: String, default:''},
    giftPrice:{type:Number, default:0}
},{timestamps:true});


module.exports = mongoose.model("Gift", GiftSchema);