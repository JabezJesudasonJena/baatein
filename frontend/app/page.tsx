"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function HomePage() {

  useEffect(() => {
    const socket = io("http://localhost:8000");

    console.log("Connected:", socket.id);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
    </div>
  );
}
