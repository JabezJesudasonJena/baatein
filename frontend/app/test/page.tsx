    'use client';


import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
    

// Add the logic
let socket : Socket;




export default function TestPage () {

    const [user2Id, setUser2Id] = useState(""); 
    const [msg, setMsg] = useState("");
    const [user1Id, setUser1Id] = useState("");


    useEffect ( () => {
        socket = io("http://localhost:8000");

        socket.on("connect", () => {
            console.log("ID : ", socket.id);
        })
        
        socket.on("get_msg",(data) => {
            console.log(data)
        })

        return () => {
            socket.disconnect();
        }

        
    }, [])


    const onEnter = () => {
        socket.emit("send_sms", {
            user1Id, user2Id, msg
        })
        // console.log({user1Id, user2Id, msg});
    }

    const onSetId = () => {
        socket.emit("set_user", user1Id)
        console.log("Hello WOrld")
    }

    return  ( 
        <div>
            

            <br />

            {/* <h1>Enter the User 1 Id </h1> */}
            <br />  
            <input
                name="user1Id" 
                type="text" 
                placeholder="Enter the user1Id"
                value={user1Id}
                onChange={(e) => setUser1Id(e.target.value)}
            />
            <br />
            <button
                className="border rounded-sm w-14 hover:cursor-pointer"
                onClick={onSetId}
            >Set
            </button>
            <br />
            <br />

            {/* <label htmlFor="user2Id">Enter the sender's id </label> */}
            <input
                name="user2Id" 
                type="text" 
                placeholder="Enter the reciever's id"
                value={user2Id}
                onChange={(e) => setUser2Id(e.target.value)}
            />
            <br />

            {/* <label htmlFor="msg">Enter the message you want to send</label> */}
            <input
                className="w-75"
                name="msg" 
                type="text" 
                placeholder="Enter the message you want to send..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />

            <br />

            <button
                onClick={onEnter}
            >Send</button>
        </div>
    )
}