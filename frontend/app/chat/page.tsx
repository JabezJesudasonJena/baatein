"use client"

import {use, useEffect, useState } from "react"  
import axios from "axios"
import { Socket, io } from "socket.io-client"

let socket : Socket;

export default function ChatPage({ searchParams }: { searchParams: { chatId?: string } }) {
    
    const params = use(searchParams);
    const chatId = params.chatId || "No chatId provided";
    const [content, setContent] = useState("");

    useEffect (() => {
        socket = io("http://localhost:8000");
        socket.on("connect", () => {
            console.log("Connected ")
        })

        return () => {
            socket.disconnect();
        }
    },[]) 


    const joinRoom = async () => {
        socket.emit("set_user", localStorage.getItem("user1Id")); 
    }   

    const onEnterSend = async () => {
        
        const user1Id = localStorage.getItem("user1Id");
        const user2Id = localStorage.getItem("user2Id");
        console.log({a : user1Id, b : user2Id})
        socket.emit("send_chat", {
            chatId ,user1Id, content
        })
        console.log("Done")
    }

    return (

        

        <div>
            
            <h1>ChatId: {chatId}</h1>
            
            <button onClick={joinRoom}>Join Room</button>            
            <br /><br />
            <input 
                type="text" 
                placeholder="Enter the message you want to send " 
                className="w-75" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
            />
            <br />

            <button
                onClick={onEnterSend}
            >Send</button>
            
        </div>
    );
}