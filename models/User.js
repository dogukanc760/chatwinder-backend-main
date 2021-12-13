const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        email:{type:String, required:true, unique:true},
        name:{type:String, required:true},
        surname:{type:String, required:true},
        password:{type:String, required:true},
        bioDesc:{type:String, default:null},
        searchType:{type:String, default:null},
        country:{type:String, default:null},
        city:{type:String, default:null},
        job:{type:String, default:null},
        age:{type:String, default:null},
        lenght:{type:String, default:null},
        weight:{type:String, default:null},
        eyesColor:{type:String, default:null},
        bodyType:{type:String, default:null},
        hairColor:{type:String, default:null},
        citizenNumber:{type:String, default:null},
        iban:{type:String, default:null},
        isStreaming:{type:Boolean, default:null},
        socketId:{type:String, default:null},
        img:{type:String, default:null},
        wallet:{type:Number, default:null},
        isAdmin:{type:Boolean, default:false},
        isActive:{type:Boolean, default:true},
        
    },
    {timestamps:true}
)

module.exports = mongoose.model("User", UserSchema);