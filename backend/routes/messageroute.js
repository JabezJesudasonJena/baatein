const express = require("express")
const {PrismaClient} = require("@prisma/client")

const msgroute = express.Router();
const prisma = new PrismaClient()

msgroute.post("/", async (req, res) => {
    const user1Id = parseInt(req.body.user1Id,10);
    const user2Id = parseInt(req.body.user2Id,10);

    const chat = await prisma.chat.findFirst({
        where : {
            OR : [
                {user1Id, user2Id},
                {user1Id : user2Id, user2Id : user1Id}
            ]
        }
    })
    if (chat) return res.json(chat);
    const newChat = await prisma.chat.create({
        data : {
            user1Id, user2Id
        }
    })
    
    res.status(200).json(newChat);
})

msgroute.get("/", async (req, res) => {
    const chatId = Number(req.query.chatId)

    const chats = await prisma.message.findMany({
        where : {
            chatId : chatId
        },
        orderBy : {createdAt : "asc"}
    })

    return res.status(200).json(chats)
})


// Test Route
msgroute.get("/info", async(req, res ) => {
    const {chatId} = Number(req.query.chatId);

    const otherData = await prisma.message.findFirst({
        where : {
            chatId : chatId
        }
    })
})




module.exports = msgroute
