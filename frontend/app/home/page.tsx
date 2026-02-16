"use client"

import { useEffect, useState } from "react"
import {io, Socket} from "socket.io-client";

let socket : Socket;

export default function HomePage(){
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Id: ", socket.id);
    })

    return () => {
      socket.disconnect();
    }
  })

  const sendMsg = () => {
    socket.emit("send_message", msg);
    setMsg("")
  } 

  return (
    <div>
      <h1>Chat App</h1>

      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type Message..."/>
      <button onClick={sendMsg}>Send</button>


    </div>
  )
}