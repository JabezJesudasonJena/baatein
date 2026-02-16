const express = require("express");
const route = require("./routes/a.js")
const authrouter = require("./routes/auth.js")
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const onlineUser = new Map();

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    socket.on("add_user" , (userId) => {
        onlineUser.set(userId, socket.id);
        console.log("Online Users", onlineUser);
    })


    socket.on("send_message", (data) => {
        const {userId, toUserId, message} = data;
        console.log("to: ",toUserId);
        const toid = onlineUser.get(toUserId);
        console.log("toid : ", toid)
        if (toid) {
            io.to(toid).emit("recieve_message", {
                userId, message
            })
        }
        console.log(message);
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