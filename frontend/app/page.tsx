"use client";

import { useEffect, useState } from "react";
import { io , Socket} from "socket.io-client";

let socket : Socket;

export default function HomePage() {
  const [message, setMessage] = useState("");


  useEffect(() => {
    socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("ID: ", socket.id);
    })

    return () => {
      socket.disconnect()
    }
  });

  const sendMessage = () => {
    socket.emit("send_message", message);
    setMessage("");
  }

  return (
    <div>
      <h1>Chat App</h1>

      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type Message..."/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
