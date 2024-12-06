"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom, checkRoom, fetchRoomData } from "@/app/api/rooms";
import { checkUserAuth } from "@/app/api/user";
import { useRoomContext } from "@/app/context/RoomContext";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 
    const [error, setError] = useState<boolean>(false);
    const {  setRoomData, updateRoomData } = useRoomContext();

    const handleCreate = async () => {
        console.log("Creating room:", roomName, "Password:", password);
        const user = await checkUserAuth();

        // check if user exists
        if (user) {
            const user_id = user.uid;
            const create = await createRoom(roomName, user_id, password);
            if (create) { // confirm that its created and to also query the roomId
                // fetch roomId
                const check = await checkRoom(user_id)
                const roomId = check;
                console.log("Create room bug check roomId,", roomId)
                if (check ){ // if room was created, fetch roomName and code for context
                    const fetchData = await fetchRoomData(check);
                    if (fetchData) {
                        const { room_name, room_code } = fetchData;
                        updateRoomData({...setRoomData, 
                            room_id : roomId, 
                            room_name : room_name,
                            room_code : room_code
                        })
                    }
                    console.log("UPDATING ROOM 111", roomId)
                    //updateRoomData({...setRoomData, room_id : roomId })
                } else {
                    setError(true);
                }
                router.push(`/dashboard/${roomId}`);
        } else {
            console.error("Error trying to check if user exists");
            alert("Error trying to check if user exists")
        }

        //router.push('/dashboard')
        };
    }
    const handleBack = () => {
        router.push("/rooms"); // Navigate back to the Rooms page
    };

    if (error) {
        alert("Error trying to create a room")
    }

    return (
        <div className="container">
            <div className="logo">LOGO</div>
            <h1>Create Room Page</h1>
            <input
                type="text"
                placeholder="Room Name or Number"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="create-button" onClick={handleCreate}>Create Room</button>
            <button className="back-button" onClick={handleBack}>
                Back
            </button>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #f7f7f7;
                }
                .logo {
                    background: #fbe4a1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }
                h1 {
                    margin-bottom: 20px;
                    font-size: 1.5rem;
                    color: #333;
                }
                input {
                    width: 300px;
                    padding: 10px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                }
                button {
                    padding: 10px 20px;
                    margin-top: 10px;
                    background: #add8e6;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .back-button {
                    margin-top: 15px;
                    background: #ccc;
                    color: #333;
                }
                .back-button:hover {
                    background: #bbb;
                }
                .create-button:hover {
                    background: #90c3e6;
                }
            `}</style>
        </div>
    );
}