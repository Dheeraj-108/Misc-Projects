import path from 'path';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

let connectedSockets = new Set();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join('./public')))

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    connectedSockets.add(socket.id);
    io.emit('clients-connected', connectedSockets.size)

    socket.on('disconnect', () => {
        console.log(`User disconnected with Id: ${socket.id}`);
        connectedSockets.delete(socket.id);
        io.emit('clients-connected', connectedSockets.size)
    })

    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('chat-message', data);
    })

    socket.on('typingStatus', (username) => {
        socket.broadcast.emit('showTypingStatus', username);
    })

})

server.listen(8080, '0.0.0.0', () => {
    console.log("Listening on port: 8080")
})