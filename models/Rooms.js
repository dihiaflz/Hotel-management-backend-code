const mongoose = require("mongoose")

const roomsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    type : {
        type : String,
        required : true,
        enum : ["Room", "Suite"] 
    },
    status : {
        type : String,
        default : "available",
        enum : ["available", "not available"] 
    },
    nbr_persons : {
        type : Number,
        required : true
    },
    nbr_singleBeds : {
        type : Number,
        default : 0
    },
    nbr_doubleBeds : {
        type : Number,
        default : 0
    }
}, { collection : "Rooms"}
)

module.exports = mongoose.model("Rooms", roomsSchema)