const express = require("express")
const roomsRouter = express.Router()
const Rooms = require("../models/Rooms")
const Bookings = require("../models/Bookings")
const authMiddleware = require("../authMiddlewareWeb")

roomsRouter.post("/addRoom", authMiddleware, async (req, res) => {
    try {
        const {type, nbr_persons, nbr_singleBeds, nbr_doubleBeds} = req.body

        // créer un nom selon le type + le dernier document ajouté
        const lastDocument = await Rooms.find({ type: type }).sort({_id : -1}).limit(1)
        console.log(lastDocument)
        let name;
        if (lastDocument.length != 0) {
            const lastNumber = parseInt(lastDocument[0].name.match(/\d+/)[0]);
            name = `${type}${lastNumber + 1}`;
        } else {
            name = `${type}1`;
        }

        const room = new Rooms({
            type : type,
            nbr_persons : nbr_persons,
            nbr_singleBeds : nbr_singleBeds,
            nbr_doubleBeds : nbr_doubleBeds,
            name : name
        })
        await room.save()
        console.log("success création d'une room, ", room)
        res.status(200).send("success création d'une room")
    }catch (error) {
        console.log("erreur lors de l'ajout de room : ", error)
        res.status(500).send("erreur lors de l'ajout de room : ", error)
    }   
})

roomsRouter.get("/", authMiddleware, async(req, res) => {
    try {
        const rooms = await Rooms.find({type : "Room"})
        const suites = await Rooms.find({type : "Suite"})
        const all = [...rooms, ...suites]
        if (all.length == 0){
            console.log("il n'existe aucune room ni suite")
            res.status(404).send("il n'existe aucune room ni suite")
        }else {
            console.log("success affichage rooms, ", all)
            res.status(200).send(all)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des rooms : ", error)
        res.status(500).send("erreur lors de l'affichage des rooms : ", error)
    }
})

roomsRouter.post("/addBooking", authMiddleware, async(req, res) => {
    try {
        const {name, room, start_date, end_date} = req.body
        const room2 = await Rooms.findOne({_id : room})
        const booking = new Bookings({
            name : name,
            room : room2.name,
            start_date : start_date,
            end_date : end_date
        })
        await booking.save()
        await Rooms.findOneAndUpdate({_id : room}, {status : "not available"})
        console.log("success ajout d'un booking, ", booking)
        res.status(200).send("success ajout d'un booking")
    }catch (error) {
        console.log("erreur lors de l'ajout d'un booking : ", error)
        res.status(500).send("erreur lors de l'ajout d'un booking : ", error)
    }
})

module.exports = roomsRouter