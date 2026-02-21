const express = require("express");
const bcrypt = require("bcrypt")
const { PrismaClient } = require("@prisma/client")
const jwt = require("jsonwebtoken")

const authrouter = express.Router();
const prisma = new PrismaClient();

authrouter.post("/signup", async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const hashedPassowrd = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data : {
                name : name,
                email : email,
                password : hashedPassowrd
            }
        })
        res.json(user)
    } catch (err) {
        return res.status(500).json({message : err.message})
    }
})

authrouter.get("/login", async (req, res) => {
    const {email, password} = req.query;

    try {
        const user = await prisma.user.findUnique({
            where : { email }
        })

        if (!user) {
            return res.status(400).json({message : "User not found"})
        }
        else { 
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch ) {
                const token = jwt.sign(user, process.env.JWT_SECRET);
                res.status(200).json({user : user, token : token});
            }
            else return res.status(400).json({message : "Wrong credentials "})
        }
        
    } catch ( err) {
        console.log(err.mesaage)
        res.status(400).json({mesaage : err.mesaage})
    }
})

module.exports = authrouter;