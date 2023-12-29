const mongoose = require("mongoose")

const bookingsSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true 
    },
    start_date : {
        type : String,
        required : true 
    },
    end_date : {
        type : String,
        required : true 
    },
    room : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "Pending",
        enum : ["Pending", "Done", "Canceled"] 
    }
}, { collection : "Bookings"}
)

module.exports = mongoose.model("Bookings", bookingsSchema)