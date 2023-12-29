const express = require("express")
const generalRouter = express.Router()
const Users = require("../models/Users")
const Guests = require("../models/Guests")
const authMiddleware = require("../authMiddleware")

generalRouter.get("/loyal", authMiddleware, async(req, res) => {
    try{
        const loyal = await Guests.find().sort({nbr_bookings : -1}).limit(2)
        if (loyal.length == 0){
            console.log("il n y'a aucun guest")
            res.status(404).send("il n y'a aucun guest")
        }else{
            console.log("success affichage des loyal guests")
            res.status(200).send(loyal)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des loyal guests : ", error)
        res.status(500).send("erreur lors de l'affichage des loyal guests : ", error)
    }
})

generalRouter.get("/actualUser", authMiddleware, async (req, res) => {
    try {
        console.log(req.user)
        if(!req.user){
            console.log("erreur inattendue, le user connecté n'existe pas")
            res.status(404).send("erreur inattendue, le user connecté n'existe pas")
        }else {
            console.log("success affichage ainfos du user actuel")
            res.status(200).send(req.user)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des infos du user actuel : ", error)
        res.status(500).send("erreur lors de l'affichage des infos du user actuel : ", error)
    }
})

module.exports = generalRouter