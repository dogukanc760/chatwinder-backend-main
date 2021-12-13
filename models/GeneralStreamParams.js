const mongoose = require('mongoose');

const GeneralStreamParamsSchema = new mongoose.Schema(
    {
        user_id:{type: 'string', required: true},
        specialnotification:{type:Boolean, required: true},
        specialgift:{type:Boolean, required: true},
        specialcoin:{type:Boolean, required: true},
        whenstopstream:{type:String, required: true},
    }
);

module.exports = mongoose.model("GeneralStreamParams", GeneralStreamParamsSchema);