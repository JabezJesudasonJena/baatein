"use client";

import { useEffect, useState } from "react";
import { io , Socket} from "socket.io-client";

let socket : Socket;


export default function HomePage() {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("")
  const [toUserId, setToUserId] = useState("")
  
  
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    socket = io("http://localhost:8000");

    
    socket.on("connect", () => {
      console.log("ID: ", socket.id);
    });

    socket.on("recieve_message", (data) => {
      console.log(data)
    })

    
    
    return () => {
      socket.disconnect()
    }
  },[]);

  const sendMessage = () => {
    socket.emit("send_message", {
      userId,
      toUserId,
      message
    });
    console.log(userId);
    console.log(toUserId)
    console.log(message)
    setMessage("");
  }

  const changeUserId = () => {
    socket.emit("add_user",userId);
  }

  return (
    <div>
      <h1>Chat App</h1>

      <h1>Set User Id </h1>
      
      <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="Add the User Id..."/>
      <button onClick={changeUserId}>Change User Id</button>
      <br />
      
      <input type="text" value={toUserId} onChange={(e) => setToUserId(e.target.value)} placeholder="Send to..."/>
      
      <br />
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Message..."/>
      <button onClick={sendMessage}>Send</button>

    </div>
  );
}
