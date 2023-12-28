const express = require("express")
const dashboardRouter = express.Router()
const Bookings = require("../models/Bookings")
const Guests = require("..//models/Guests")
const authMiddleware = require("../authMiddleware")
const bookingRouter = require("./Booking")


dashboardRouter.get("/guests", authMiddleware, async(req, res) => {
    try{
        const guests = await Guests.find().sort({nbr_bookings : -1})
        if (guests.length == 0){
            console.log("il n y'a aucun guest")
            res.status(404).send("il n y'a aucun guest")
        }else{
            console.log("success affichage des guests")
            res.status(200).send(guests)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des guests : ", error)
        res.status(500).send("erreur lors de l'affichage des guests : ", error)
    }
})

dashboardRouter.get("/nbrBookings", authMiddleware, async(req, res) => {
    try {
        const nbr = await Bookings.countDocuments()
        console.log("success affichage nombre total de bookings ", nbr)
        res.status(200).send({"nbr" : nbr})
    }catch (error){
        console.log("erreur lors de l'affichage du nombre de bookings : ", error)
        res.status(500).send("erreur lors de l'affichage du nombre de bookings : ", error)
    }
})

dashboardRouter.get("/nbrDone", authMiddleware, async(req, res) => {
    try {
        const nbr = await Bookings.countDocuments({status : "Done"})
        console.log("success affichage nombre total de bookings done ", nbr)
        res.status(200).send({"nbr" : nbr})
    }catch (error){
        console.log("erreur lors de l'affichage du nombre de bookings done : ", error)
        res.status(500).send("erreur lors de l'affichage du nombre de bookings done : ", error)
    }
})




module.exports = dashboardRouter

