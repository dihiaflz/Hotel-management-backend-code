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

// web section
const signIn = require("./routesWeb/SignIn")
app.use("/signIn", signIn)

const dashboard = require("./routesWeb/Dashboard")
app.use("/dashboard", dashboard)

const rooms = require("./routesWeb/Rooms")
app.use("/rooms", rooms)

const general = require("./routesWeb/General")
app.use("/general", general)

const booking = require("./routesWeb/Booking")
app.use("/booking", booking)

const users = require("./routesWeb/Users")
app.use("/users", users)

// app section
const signInApp = require("./routesApp/SignIn")
app.use("/signInApp", signInApp)

const dashboardApp = require("./routesApp/Dashboard")
app.use("/dashboardApp", dashboardApp)

const roomsApp = require("./routesApp/Rooms")
app.use("/roomsApp", roomsApp)

const generalApp = require("./routesApp/General")
app.use("/generalApp", generalApp)

const bookingApp = require("./routesApp/Booking")
app.use("/bookingApp", bookingApp)

const usersApp = require("./routesApp/Users")
app.use("/usersApp", usersApp)


