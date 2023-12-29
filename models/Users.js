const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    nom : {
        type : String,
        required : true 
    },
    prenom : {
        type : String,
        required : true 
    },
    email : {
        type : String,
        required : true 
    },
    password : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum: ["super", "normal"],
        default : "normal"
    }
}, { collection : "Users"}
)

module.exports = mongoose.model("Users", usersSchema)