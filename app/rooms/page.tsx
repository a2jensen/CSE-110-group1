"use client";

import Link from "next/link";

export default function RoomsPage() {
    return (
        <div className="container">
            <header className="header">
                <div className="logo">LOGO</div>
                <h1>Rooms</h1>
            </header>

            <div className="content">
                <Link href="/rooms/join">
                    <button className="action-button">Join Room</button>
                </Link>
                <Link href="/rooms/create">
                    <button className="action-button">Create Room</button>
                </Link>
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                    min-height: 100vh;
                    background: #f7f7f7;
                    padding: 20px;
                }
                .header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-bottom: 30px;
                }
                .logo {
                    background: #fbe4a1;
                    padding: 10px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }
                h1 {
                    font-size: 1.5rem;
                    color: #333;
                    margin: 0;
                }
                .content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    width: 100%;
                    max-width: 400px;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }
                .action-button {
                    width: 100%;
                    padding: 15px;
                    font-size: 1rem;
                    font-weight: bold;
                    color: #fff;
                    background: #add8e6;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .action-button:hover {
                    background: #90c3e6;
                }
            `}</style>
        </div>
    );
}
