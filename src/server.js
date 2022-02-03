const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('color', (message) => {
    console.log(message);
    io.emit('ColorSelected', message);
  })
});


server.listen(3535, () => {
  console.log('listening on *:3535');
});