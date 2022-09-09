import React, { useEffect } from 'react'
import './Chat.css'
import { user } from '../Join/Join';
import socketIO from 'socket.io-client';
import sendLogo from '../../images/send.png'

const ENDPOINT = 'http://localhost:4500'

const Chat = () => {


    useEffect(() => {
        const socket = socketIO(ENDPOINT, { transports: ['websocket'] })


        socket.on('connect', () => {
            alert("Connected");
        })
        console.log(socket);
        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            console.log(data.user, data.message);
        });

        socket.on("userJoined", (data) => {
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            console.log(data.user, data.message);
        })


        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header"></div>
                <div className="chatBox"></div>
                <div className="inputBox">
                    <input type="text" id="chatInput" />
                    <button className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>

            </div>
        </div>
    )
}

export default Chat
