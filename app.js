const express = require("express");
const app = express();
const http = require('http'); //since socket io runs on http server
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app); //server is made
const io = socketio(server);

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    socket.on("send-location", (data)=>{
        io.emit("receive-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", ()=>{
        io.emit("user-disconnected", socket.id);
    })
});


app.get("/", (req,res)=>{
    res.render('index');

})

server.listen(3000)

// app.listen(3000)
