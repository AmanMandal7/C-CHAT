import React, { useEffect, useState } from 'react'
import './Chat.css'
import { user } from '../Join/Join';
import socketIO from 'socket.io-client';
import sendLogo from '../../images/send.png'
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../images/closeIcon.png'


const ENDPOINT = 'http://localhost:4500'

let socket;

const Chat = () => {

    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    useEffect(() => {

        socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on('connect', () => {
            alert("Connected");
            setid(socket.id);
        })
        console.log(socket);
        socket.emit("joined", { user })

        socket.on("welcome", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        });

        socket.on("userJoined", (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message);
        })


        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [])


    useEffect(() => {

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data]);
            console.log(data.user, data.message, data.id);
        })


        return () => {
            socket.off();
        }
    }, [messages])

    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h1>C CHAT</h1>
                    <a href="/"><img src={closeIcon} alt="Close" /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(event) => event.key === "Enter" ? send() : null} type="text" id="chatInput" />
                    <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
                </div>

            </div>
        </div>
    )
}

export default Chat
