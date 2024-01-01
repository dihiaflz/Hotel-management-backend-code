const express = require("express")
const usersRouter = express.Router()
const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const authMiddleware = require("../authMiddlewareWeb")


usersRouter.post("/", authMiddleware, async (req, res) => {
    try{
    const {nom, prenom, email, password} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = new Users({
        nom : nom,
        prenom : prenom,
        email : email,
        password : hashedPassword
    })
    await user.save()
    console.log("success création d'un user, ", user)
    res.status(200).send("success création d'un user")
    }catch (error) {
        console.log("erreur lors de la création du nouveau user : ", error)
        res.status(500).send("erreur lors de la création du nouveau user : ", error)
    }
})

usersRouter.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await Users.find({status : "normal"})
        if(users.length == 0){
            console.log("il n'existe aucun user")
            res.status(404).send("il n'existe aucun user")
        }else {
            console.log("voici les users : ", users)
            res.status(200).send(users)
        }
    }catch (error) {
        console.log("erreur lors de l'affichage des utilisateurs' : ", error)
        res.status(500).send("erreur lors de l'affichage des utilisateurs' : ", error) 
    }
})

usersRouter.post("/deleteUser/:id" , authMiddleware, async(req, res) => {
    try{
        await Users.findOneAndDelete({_id : req.params.id})
        console.log("success suppression d'un user")
        res.status(200).send("success suppression d'un user")
    }catch (error) {
        console.log("erreur lors de la suppression d'un utilisateur : ", error)
        res.status(500).send("erreur lors de la suppression d'un utilisateur : ", error) 
    }
})

module.exports = usersRouter
