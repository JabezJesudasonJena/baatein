const express = require("express");
const route = require("./routes/a.js")
const authrouter = require("./routes/auth.js")
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client")
const cors = require("cors");

const app = express();
app.use(cors())
const server = http.createServer(app);
const prisma = new PrismaClient();

const onlineUser = new Map();

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000/test"
    }
})

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    socket.on("add_user" , (userId) => {
        onlineUser.set(userId, socket.id);
        console.log("Online Users", onlineUser);
    })
    

    socket.on("set_user", (user1Id) => {
        onlineUser.set(user1Id, socket.id);
        console.log("Online users: ", onlineUser);
    })

    socket.on("send_message", (data) => {
        const {userId, toUserId, message} = data;
        const toid = onlineUser.get(toUserId);
        if (toid) {
            io.to(toid).emit("recieve_message", {
                userId, message
            })
        }
    })

    socket.on("send_sms", (data) => {
        const {user1Id, user2Id, msg} = data;
        const user2Present = onlineUser.get(user2Id);
        if (user2Present) {
            io.to(user2Present).emit("recieve_message", {
                user1Id, msg
            })
        }
        
    })


    // This socket is not complete
    socket.on("sendMessage", async (data) => {
        const {toUserId, chatId, senderId, content} = data;
        
        const user = await prisma.user.create({

        })

        const toid = onlineUser.get(toUserId);
        if (toid) {
            io.to(toid).emit("recieve_message", {
                userId, message
            })
        }
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
})


app.use(express.json())

app.use("/api", route)

app.use("/auth",authrouter)

server.listen(8000, () => {console.log("Server started at http://localhost:8000/")});