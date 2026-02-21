const express = require("express");
const authrouter = require("./routes/auth.js")
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client")
const cors = require("cors");
const messageRoute = require("./routes/messageroute.js")

const app = express();
app.use(cors())
const server = http.createServer(app);
const prisma = new PrismaClient();

const onlineUser = new Map();

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    // socket.on("add_user" , (userId) => {
    //     onlineUser.set(userId, socket.id);
    //     console.log("Online Users", onlineUser);
    // })
    

    socket.on("set_user", (user1Id) => {
        onlineUser.set(user1Id, socket.id);
        console.log("Online users: ", onlineUser);
    })

    // socket.on("send_message", (data) => {
    //     const {userId, toUserId, message} = data;
    //     const toid = onlineUser.get(toUserId);
    //     if (toid) {
    //         io.to(toid).emit("recieve_message", {
    //             userId, message
    //         })
    //     }
    // })

    socket.on("send_sms", (data) => {
        const {user1Id, user2Id, msg} = data;
        const user2Present = onlineUser.get(user2Id);
        if (user2Present) {
            io.to(user2Present).emit("get_msg", {
                user1Id, msg
            })
        }
    })

    socket.on("search_user", async (data) => {
        const {user2Id} = data 
        const finduser = await prisma.user.findFirst({
            where : {
                OR : [
                    {user1Id : user2Id},
                    {user1Id : user2Id, user2Id : user1Id}
                ]
            }
        })

        if (chat) console.log()
    })


    // This socket is not complete
    // socket.on("sendMessage", async (data) => {
    //     const {toUserId, chatId, senderId, content} = data;
        
    //     const user = await prisma.user.create({

    //     })

    //     const toid = onlineUser.get(toUserId);
    //     if (toid) {
    //         io.to(toid).emit("recieve_message", {
    //             userId, message
    //         })
    //     }
    // })
    
    socket.on("send_chat", async (data) => {
        // const {chatId, user1Id, content} = data;
        const chatId = Number(data.chatId)
        const user1Id = Number(data.user1Id)
        const content = data.content

        const newMsg = await prisma.message.create({
            data : {
                chatId, senderId : user1Id, content
            }
        })
        console.log(newMsg)
    })


    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        for ( let [userId, socketId] of onlineUser.entries()) {
            if (socketId == socket.id) {
                onlineUser.delete(userId);
                break;
            }
        }
    });


    socket.on("get_past_chats" ,async (data) => {
        const {user1Id } = data;
        const allChats = await prisma.chat.findMany({
            where : {
                user1Id : user1Id
            },
        })
        socket.emit("recieve_all_data", allChats);
     })

    socket.on("get_current_chat", async (data) => {
        const {chatId} = await prisma.message.findMany({
            where : {
                chatId : chatId
            },
            orderBy : {id : "asc"}
        })
    })

    

})


app.use(express.json())


app.use("/auth",authrouter)
app.use("/chat", messageRoute)

server.listen(8000, () => {console.log("Server started at http://localhost:8000/")});