const express = require("express")
const bookingRouter = express.Router()
const Bookings = require("../models/Bookings")
const Rooms = require("../models/Rooms")
const Guests = require("../models/Guests")
const authMiddleware = require("../authMiddlewareWeb")

bookingRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const bookings = await Bookings.find().sort({_id : -1})
        if(bookings.length == 0){
            console.log("il n y'a aucun booking")
            res.status(404).send("il n y'a aucun booking")
        }else {
            console.log("success get bookings")
            res.status(200).send(bookings)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des bookings : ", error)
        res.status(500).send("erreur lors de l'affichage des bookings : ", error)
    }
})

bookingRouter.post("/", authMiddleware, async(req, res) => {
    try {
        const {id, status} = req.body
        if(status == "Canceled"){
            const booking = await Bookings.findById(id)
            await Rooms.findOneAndUpdate({name : booking.room}, {$set : {status : "available"}})
            await Bookings.findByIdAndUpdate({_id: id}, {status : "Canceled"})
            console.log("status changé")
            res.status(200).send("status changé")
        }else if(status == "Done"){
            await Bookings.findByIdAndUpdate({_id: id}, {status : "Done"})
            const booking = await Bookings.findById(id)
            const guest = await  Guests.findOne({name : booking.name})
            if (!guest){
                const newGuest = new Guests({
                    name : booking.name,
                })
                await newGuest.save()
            }else{
                await Guests.findOneAndUpdate({name : booking.name}, {$inc: { nbr_bookings: 1 }})
            }
            console.log("status changé")
            res.status(200).send("status changé")
        }else {
            console.log("status erroné")
            res.status(404).send("status erroné") 
        }
    }catch (error) {
        console.log("erreur lors du changement du status du booking : ", error)
        res.status(500).send("erreur lors du changement du status du booking : ", error)
    }
})

module.exports = bookingRouter