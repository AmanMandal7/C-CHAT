const http = require('http');
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const users = [{}];

app.use(cors());

const port = 4500 || process.env.PORT; //if we host the app then with the help of process.env.PORT, it will work on the port assigned by the hosting site

app.get("/", (req, res) => {
    res.send("API is running...")
})

const io = socketIO(server);

io.on('connection', (socket) => {    //this io is a whole circuit and it contains different sockets in its
    console.log("New connection");

    socket.on("joined", ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined`)
        socket.broadcast.emit("userJoined", { user: "Admin", message: `${users[socket.id]} has joined` });
        socket.emit("welcome", { user: "Admin", message: `Welcome to the chat,${users[socket.id]}` });
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: "Admin", message: `${users[socket.id]} has left` })
        console.log(`User left`);
    })


})

server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})


