"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ChatPage() {

    const router = useRouter();

    const [user2Id, setUser2Id] = useState("");
    const [user1Id, setUser1Id] = useState("");

    const onEnter = async () => {
        const data = await axios.post("http://localhost:8000/chat", {
            user1Id, user2Id
        })
        console.log(data.data.id);

        localStorage.setItem("user1Id", user1Id);
        localStorage.setItem("user2Id", user2Id)
        
        router.push(`/chat?chatId=${data.data.id}`);
    }
    
    return(
        <div>
            <h1>Enter the user id to send</h1>

            <input
                type="text"
                value={user1Id}
                onChange={(e) => setUser1Id(e.target.value)}
                placeholder="Enter the user 1"
            />
            <br />
            <input
                type="text"
                value={user2Id}
                onChange={(e) => setUser2Id(e.target.value)}
                placeholder="Enter the user 2"
            />
            <button
                onClick={onEnter}
            >
                 Start
            </button>
        </div>
    )
}   
