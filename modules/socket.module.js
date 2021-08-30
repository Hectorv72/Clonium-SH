/* eslint-disable padded-blocks */
/* eslint-disable no-multi-spaces */
const socketIO = require('socket.io');
const http     = require('http');
const port     = 4040;

const SocketConnect = (app) => {

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

    // socket.on('mensaje', (laik, id) => {
    //   io.emit(id, laik);
    // });

    const messages = [
      {
        author: 'Carlos',
        text: 'Hola! que tal?'
      },
      {
        author: 'Pepe',
        text: 'Muy bien! y tu??'
      },
      {
        author: 'Paco',
        text: 'Genial!'
      }
    ];
    console.log(io.sockets);

    socket.emit('messages', messages);

    socket.on('new-message', function (data) {
      messages.push(data);
      console.log(data);
      console.log(messages);

      io.sockets.emit('messages', messages);
    });
  });

  // server.listen(3000, () => {
  //   console.log('funca');
  // });

  // app.get('port')
};

module.exports = SocketConnect;
