require("dotenv").config()
const express = require("express")
const signInRouter = express.Router()
const Users = require("../models/Users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

signInRouter.post("/", async (req, res) => {
    try{
        const user = await Users.findOne({email : req.body.email})
        if(!user){
            console.log("aucun user n'est relié à cet email")
            res.status(404).send("aucun user n'est relié à cet email")
        }else{
            const valide = await bcrypt.compare(req.body.password, user.password)
            if(valide){
                const token = jwt.sign({user : user}, process.env.SECRET, {expiresIn: "7d"})
                console.log("Success sign in")
                res.status(200).send(token)
            }else{
                console.log("mot de passe incorrect")
                res.status(404).send("mot de passe incorrect")
            }
        }
    }catch (error) {
        console.log("erreur lors du sign in : ", error)
        res.status(500).send("erreur lors du sign in : ", error)
    }
})

module.exports = signInRouter