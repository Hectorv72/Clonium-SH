/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const socketIO = require('socket.io');
const http     = require('http');
const { socketGameBoard } = require('./clonium/game/clonium.module');
// const { getBoard, updateBoard } = require('./board.module');

const SocketConnect = (app, port) => {

  const server = http.createServer(app);
  // const server = http.Server(app);

  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
  });

  server.listen(port, function () {
    console.log('Servidor corriendo en http://localhost:' + port);
  });

  io.on('connection', (socket) => {

    socket.on('join-room', (room) => {
      socket.join(room);
    });

    let cooldownClick = false;

    socket.on('add-dot-emitter', (data) => {
      if (!cooldownClick) {
        const response = socketGameBoard(data);
        io.sockets.in(data.room).emit('add-dot-receiver', response);
      } else {
        setTimeout(() => { cooldownClick = false; }, 500);
      }
    });

  });

};

module.exports = { SocketConnect };
