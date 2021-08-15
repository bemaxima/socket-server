const uuid = require('uuid');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set('io', io);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/foo', (req, res) => {
  const { ip } = req.query;
  console.log(data);
  const room = data.find(x => x.ip === ip).guid
  app.get('io').in(room).emit('message', 'Message from server!')
  return res.json({})
})

app.post('/create', (req, res) => {
  const room = uuid.v4();
  socket.join(room);
  return res.json({ room })
})

const data = [];

io.on('connection', (socket) => {
  socket.on('register', (payload) => {
    const guid = uuid.v4();
    data.push({ guid, ip: payload.ip });
    socket.join(guid);
    socket.emit('register_guid', guid);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});