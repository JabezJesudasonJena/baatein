const express = require("express");
const route = require("./routes/a.js")
const authrouter = require("./routes/auth.js")
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const onlineUsers = {};

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    
    socket.on("send_message", (data) => {
        console.log("Message: ", data);
        io.emit("recieve_message", data);
    })

    socket.io("disconnect", () => {
        console.log("User disconnected: ", socket.id)
    })
})

app.use(express.json())

app.use("/api", route)

app.use("/auth",authrouter)

server.listen(8000, () => {console.log("Server started at http://localhost:8000/")});