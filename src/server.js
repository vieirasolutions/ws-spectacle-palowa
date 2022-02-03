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

const PORT = process.env.PORT || 3535;

server.listen(PORT, () => {
  console.log('listening on *:'+PORT);
});