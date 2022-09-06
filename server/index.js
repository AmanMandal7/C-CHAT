const http = require('http');
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());

const port = 4500 || process.env.PORT; //if we host the app then with the help of process.env.PORT, it will work on the port assigned by the hosting site

app.get("/", (req, res) => {
    res.send("API is running...")
})

const io = socketIO(server);
io.on("connection", () => {
    console.log("New connection");
})

server.listen(port, console.log(`server started on http://localhost:${port}`));

