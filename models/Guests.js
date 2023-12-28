const mongoose = require("mongoose")

const guestsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    nbr_bookings : {
        type : Number,
        default : 1
    }
}, { collection : "Guests"}
)

module.exports = mongoose.model("Guests", guestsSchema)