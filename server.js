require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = 900

// se connecter à la bdd
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
       console.log(err)
    }
}

connectDB()

mongoose.connection.once("open", () => {
    console.log("connecté à la bdd")
    app.listen(PORT, () => console.log(`Port ${PORT}`))
})
mongoose.connection.on("error", err => {
    console.log(err)
})

// Plus tard pour le linking
app.use(cors({
    origin: '*'
}));

const signIn = require("./routes/SignIn")
app.use("/signIn", signIn)

const dashboard = require("./routes/Dashboard")
app.use("/dashboard", dashboard)

const rooms = require("./routes/Rooms")
app.use("/rooms", rooms)

const general = require("./routes/General")
app.use("/general", general)

const booking = require("./routes/Booking")
app.use("/booking", booking)
const users = require("./routes/Users")
app.use("/users", users)


